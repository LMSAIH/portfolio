import { DataTable } from "./deployments-table";
import type { ColumnDef } from "@tanstack/react-table"
import { ExternalLink, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export type Deployment = {
    id: string
    name: string
    description: string
    url: string
    status: "online" | "offline" | "checking"
}

const StatusBadge = ({ status }: { status: Deployment["status"] }) => {
    const statusConfig = {
        online: {
            label: "Online",
            className: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800"
        },
        offline: {
            label: "Offline",
            className: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800"
        },
        checking: {
            label: "Checking...",
            className: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800"
        },
    }

    const config = statusConfig[status]

    return (
        <Badge variant="outline" className={config.className}>
            {status === "checking" && <RefreshCw className="mr-1 h-3 w-3 animate-spin" />}
            {config.label}
        </Badge>
    )
}

export const columns: ColumnDef<Deployment>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="max-w-[500px] min-w-[400px] text-muted-foreground whitespace-pre-wrap break-words">
                {row.getValue("description")}
            </div>
        ),
    },
    {
        accessorKey: "url",
        header: "URL",
        cell: ({ row }) => {
            const url = row.getValue("url") as string
            return (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                >
                    Visit
                    <ExternalLink className="h-4 w-4" />
                </a>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
]

const initialData: Deployment[] = [
    {
        id: "dep_001",
        name: "Concpt",
        description: "Concpt is a platform that helps you plan, design, share and edit your projects. It is a powerful tool for developers and designers that can generate structured project outlines in one prompt. It offers complete freedom to create and edit your projects.",
        url: "https://concpt.dev",
        status: "checking"
    },
    {
        id: "dep_002",
        name: "Innovate Recreation",
        description: "Innovate Recreation is a research initiative focused on the experiences of immigrant and racialized communities in British Columbia's public recreation. ",
        url: "https://innovaterecreation.ca/",
        status: "checking"
    },
    {
        id: "dep_003",
        name: "Neosana",
        description: "Neosana is a application that helps you centralize medical records and health data. It is designed to be a comprehensive health management tool that connects patients and healthcare providers.",
        url: "https://neosana.app",
        status: "checking"
    },
    {
            id: "dep_004",
            name: "ProfitSNFT",
            description: "ProfitSNFT is a website created for a student-led case-studies simulator that takes place every year at the Autonomous University of the State of Mexico.",
            url: "https://www.profitsnft.org/",
            status: "checking"
    },
    {
        id: "dep_005",
        name: "Langara French Club",
        description: "The website for the Langara French Club. Featuring the club members, events, contact and much more.",
        url: "https://langarafr.com",
        status: "checking"
    },
];

// Function to check if a URL is reachable
const checkUrlStatus = async (url: string): Promise<"online" | "offline"> => {
    try {
        // Use a CORS proxy or direct fetch with no-cors mode
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(url, {
            method: 'HEAD',
            mode: 'no-cors',
            signal: controller.signal,
        });

        console.log(response.ok);

        clearTimeout(timeoutId);

        // In no-cors mode, we can't read the status, but if fetch succeeds, the site is likely online
        return "online";
    } catch (error) {
        // If fetch fails, the site is likely offline or unreachable
        return "offline";
    }
};

export function Deployments() {
    const [data, setData] = useState<Deployment[]>(initialData);

    useEffect(() => {
        const checkStatuses = async () => {
            const updatedData = await Promise.all(
                initialData.map(async (deployment) => {
                    const status = await checkUrlStatus(deployment.url);
                    return { ...deployment, status };
                })
            );
            setData(updatedData);
        };

        checkStatuses();
    }, []);

    return (
        <div className="w-full">
            <DataTable columns={columns} data={data} title="Deployments" />
        </div>
    )
}
