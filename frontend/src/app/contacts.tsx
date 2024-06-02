"use client"

import { ContactForm } from '@/components/contact-form';
import ConatctsList from '@/components/contacts-list'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';


export default function Contacts() {
    const [open, setOpen] = useState({
        form: false,
        delete: false
    })
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [currentContact, setCurrentContact] = useState<Contact>({} as Contact)

    async function getContacts() {
        try {
            const url = 'http://127.0.0.1:5000/'
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch(url, options)
            const data: Contact[] = await response.json();
            setContacts(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const deleteContact = async (id: number) => {
        try {
            const url = 'http://127.0.0.1:5000/contact/' + id
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch(url, options)
            const result = await response.json()
            toast.success(result.message);
            getContacts();
            setOpen({ ...open, delete: false });
        }
        catch (error) {
            console.error(error);
        }
    }

    const updateCallback = () => {
        getContacts();
        setOpen({ ...open, form: false });
    }

    useEffect(() => {
        getContacts();
    }, []);

    return (
        <div className='flex flex-col gap-10 max-w-screen-md w-full'>
            <ConatctsList contacts={contacts} actions={{
                edit: (contact: Contact) => {
                    setCurrentContact(contact);
                    setOpen({
                        ...open,
                        form: true
                    })
                },
                delete: (contact: Contact) => {
                    setCurrentContact(contact);
                    setOpen({
                        ...open,
                        delete: true
                    })
                },
            }} />
            <Dialog open={open.form} onOpenChange={
                (isOpen) => { setOpen({ ...open, form: isOpen }) }
            }>
                <DialogTrigger asChild>
                    <Button className='w-fit mx-auto' variant="outline" onClick={
                        () => {
                            setCurrentContact({} as Contact);
                        }
                    }>
                        Create Contact
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <ContactForm currentContact={currentContact} updateCallback={updateCallback} />
                </DialogContent>
            </Dialog>
            <AlertDialog open={open.delete} onOpenChange={
                (isOpen) => { setOpen({ ...open, delete: isOpen }) }
            }>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the contact
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className={buttonVariants({ variant: "destructive" })}
                            onClick={() => {
                                deleteContact(currentContact.id);
                            }}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
