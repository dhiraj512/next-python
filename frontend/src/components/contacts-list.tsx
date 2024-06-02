"use client"

import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from './ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface ConatctsListProps {
    contacts: Contact[];
    actions: {
        edit: (contact: Contact) => void;
        delete: (contact: Contact) => void;
    };
}

export default function ConatctsList({ contacts, actions }: ConatctsListProps) {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow className='bg-muted/50 divide-x-2'>
                        <TableHead>Id</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contacts.map((contact, id) => (
                        <TableRow key={id}>
                            <TableCell>{contact.id}</TableCell>
                            <TableCell>{contact.firstName}</TableCell>
                            <TableCell>{contact.lastName}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon"
                                onClick={() => actions.edit(contact)}
                                >
                                    <Pencil className='size-4' />
                                </Button>
                                <Button variant="ghost" size="icon"
                                onClick={() => actions.delete(contact)}
                                >
                                    <Trash2 className='size-4' />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
