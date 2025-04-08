import ContactManagement from "../../components/app/ContactManagement";

const ContactsPageAdmin = () => {
    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Gestión de Contactos</h1>
        <ContactManagement />
        </div>
    );
    }

export default ContactsPageAdmin;