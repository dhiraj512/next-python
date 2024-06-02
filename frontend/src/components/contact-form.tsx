"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState } from "react"

const FormSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

interface ContactFormProps {
    currentContact: Contact
    updateCallback: () => void
}

export function ContactForm({ currentContact, updateCallback }: ContactFormProps) {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstName: currentContact.firstName || "",
            lastName: currentContact.lastName || "",
            email: currentContact.email || "",
        },
    })

    const isUpdating = Object.keys(currentContact).length > 0

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            const url = 'http://127.0.0.1:5000/' + (isUpdating ? `contact/${currentContact.id}` : 'contact')
            const options = {
                method: isUpdating ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(url, options)
            const result = await response.json()
            toast.success(result.message);
            form.reset();
            updateCallback();
        }
        catch (error) {
            console.error(error);
            toast.error('Something went wrong');
            updateCallback();
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormDescription className="text-lg font-semibold text-foreground leading-none tracking-tight">
                    {isUpdating ? 'Update' : 'Add a new'} contact
                </FormDescription>
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-Mail</FormLabel>
                            <FormControl>
                                <Input placeholder="John.doe@company.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
