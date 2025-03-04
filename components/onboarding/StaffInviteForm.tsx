// src/components/onboarding/StaffInviteForm.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";

interface StaffMember {
  id: string;
  email: string;
  role: string;
}

export function StaffInviteForm() {
  const [isAdding, setIsAdding] = useState(false);
  const [newStaff, setNewStaff] = useState({ email: "", role: "staff" });
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [isInviting, setIsInviting] = useState(false);

  const addStaffMember = () => {
    if (!newStaff.email) return;

    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newStaff.email)) {
      // toast({
      //   title: "Invalid Email",
      //   description: "Please enter a valid email address",
      //   variant: "destructive",
      // });
      toast("Please enter a valid email address");
      return;
    }

    setStaffList([
      ...staffList,
      {
        id: Date.now().toString(),
        email: newStaff.email,
        role: newStaff.role,
      },
    ]);
    setNewStaff({ email: "", role: "staff" });
    setIsAdding(false);
  };

  const removeStaffMember = (id: string) => {
    setStaffList(staffList.filter((staff) => staff.id !== id));
  };

  const sendInvites = () => {
    if (staffList.length === 0) {
      // toast({
      //   title: "No Staff Added",
      //   description: "Please add at least one staff member to invite",
      //   variant: "destructive",
      // });
      toast("Please add at least one staff member to invite");
      return;
    }

    setIsInviting(true);

    // Simulate API call
    setTimeout(() => {
      // toast({
      //   title: "Invites Sent",
      //   description: `Successfully sent ${staffList.length} invitation${
      //     staffList.length > 1 ? "s" : ""
      //   }`,
      // });
      toast(
        `Successfully sent ${staffList.length} invitation${
          staffList.length > 1 ? "s" : ""
        }`
      );
      setIsInviting(false);
      setStaffList([]);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {staffList.map((staff) => (
          <div
            key={staff.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div>
              <p className="font-medium">{staff.email}</p>
              <p className="text-sm text-gray-500 capitalize">{staff.role}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeStaffMember(staff.id)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="bg-gray-50 p-4 rounded-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="staff@example.com"
              value={newStaff.email}
              onChange={(e) =>
                setNewStaff({ ...newStaff, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={newStaff.role}
              onValueChange={(value) =>
                setNewStaff({ ...newStaff, role: value })
              }
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="provider">Provider/Dentist</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="frontdesk">Front Desk</SelectItem>
                <SelectItem value="assistant">Dental Assistant</SelectItem>
                <SelectItem value="hygienist">Hygienist</SelectItem>
                <SelectItem value="labtech">Lab Technician</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Button onClick={addStaffMember} disabled={!newStaff.email}>
              Add Staff Member
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsAdding(false);
                setNewStaff({ email: "", role: "staff" });
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => setIsAdding(true)}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      )}

      {staffList.length > 0 && (
        <Button onClick={sendInvites} disabled={isInviting} className="w-full">
          {isInviting ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Sending Invites...
            </>
          ) : (
            `Send Invites (${staffList.length})`
          )}
        </Button>
      )}
    </div>
  );
}
