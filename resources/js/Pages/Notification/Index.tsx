import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Notification() {
    const { auth }: any = usePage().props;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-pretty">Notifications</h2>}
        >
            <Head title="Notifications" />
            <div className="min-h-[80vh] flex items-center justify-center">
                <p className="text-center">Developer masi males..</p>
            </div>
        </AuthenticatedLayout>
    );
}
