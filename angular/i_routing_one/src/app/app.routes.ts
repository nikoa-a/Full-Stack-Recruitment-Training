import { Routes } from '@angular/router';
import { ContactForm } from './components/contactform.component';
import { ContactList } from './components/contactlist.component';

export const routes: Routes = [
    {path: "", component: ContactList},
    {path: "form", component: ContactForm}
];
