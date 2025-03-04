// components/dashboard/lab-orders-status.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Calendar,
  ArrowUpDown,
  MoreHorizontal,
  Filter,
  FlaskConical,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

// Define lab order type
interface LabOrder {
  id: string;
  patientName: string;
  patientId: string;
  labName: string;
  orderType: "Crown" | "Bridge" | "Denture" | "Implant" | "Other";
  status:
    | "Pending"
    | "InProgress"
    | "Shipped"
    | "Received"
    | "Completed"
    | "Canceled";
  dateOrdered: Date;
  dueDate: Date;
  priority: "Low" | "Normal" | "High" | "Urgent";
}

const getLabOrders = (): LabOrder[] => {
  // In a real app, this would be fetched from your API
  return [
    {
      id: "lab-001",
      patientName: "Sarah Johnson",
      patientId: "pat-123",
      labName: "ProDental Lab",
      orderType: "Crown",
      status: "InProgress",
      dateOrdered: new Date(2025, 1, 28), // Feb 28, 2025
      dueDate: new Date(2025, 2, 10), // March 10, 2025
      priority: "Normal",
    },
    {
      id: "lab-002",
      patientName: "David Kim",
      patientId: "pat-101",
      labName: "Advanced Dental Works",
      orderType: "Implant",
      status: "Pending",
      dateOrdered: new Date(2025, 2, 1), // March 1, 2025
      dueDate: new Date(2025, 2, 15), // March 15, 2025
      priority: "High",
    },
    {
      id: "lab-003",
      patientName: "Emma Rodriguez",
      patientId: "pat-789",
      labName: "ProDental Lab",
      orderType: "Bridge",
      status: "Shipped",
      dateOrdered: new Date(2025, 1, 25), // Feb 25, 2025
      dueDate: new Date(2025, 2, 8), // March 8, 2025
      priority: "Normal",
    },
    {
      id: "lab-004",
      patientName: "Robert Smith",
      patientId: "pat-235",
      labName: "Precision Dental Lab",
      orderType: "Denture",
      status: "Pending",
      dateOrdered: new Date(2025, 2, 2), // March 2, 2025
      dueDate: new Date(2025, 2, 16), // March 16, 2025
      priority: "Urgent",
    },
    {
      id: "lab-005",
      patientName: "Jennifer Lee",
      patientId: "pat-512",
      labName: "Advanced Dental Works",
      orderType: "Crown",
      status: "Completed",
      dateOrdered: new Date(2025, 1, 20), // Feb 20, 2025
      dueDate: new Date(2025, 2, 5), // March 5, 2025
      priority: "Normal",
    },
  ];
};

// Get status badge style
const getStatusBadge = (status: LabOrder["status"]) => {
  const styles = {
    Pending:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    InProgress: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Shipped:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    Received: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return styles[status];
};

// Get priority badge style
const getPriorityBadge = (priority: LabOrder["priority"]) => {
  const styles = {
    Low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    Normal: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    High: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    Urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return styles[priority];
};

export default function LabOrdersStatus() {
  const [labOrders] = useState<LabOrder[]>(getLabOrders());

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FlaskConical className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Showing {labOrders.length} recent lab orders
          </span>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/lab-orders">View All</Link>
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Patient
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Due Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/dashboard/lab-orders/${order.id}`}
                    className="hover:underline"
                  >
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <Link
                      href={`/dashboard/patients/${order.patientId}`}
                      className="font-medium hover:underline flex items-center"
                    >
                      <User className="h-3 w-3 mr-1" />
                      {order.patientName}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {order.labName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{order.orderType}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{format(order.dueDate, "MMM d, yyyy")}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Ordered: {format(order.dateOrdered, "MMM d, yyyy")}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityBadge(order.priority)}>
                    {order.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link
                          href={`/dashboard/lab-orders/${order.id}`}
                          className="w-full"
                        >
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem>Track Order</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
