import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiEdit } from "react-icons/ci";
import { Input } from "@/components/ui/input";

interface DialogProps {
  messageId: string; // ID ของข้อความที่ต้องการแก้ไข
  EditMessage: (id: string, message: string) => Promise<void>; // ฟังก์ชันแก้ไขข้อความ
}

export function EditText({ messageId, EditMessage }: DialogProps) {
  const [isOpen, setIsOpen] = useState(false); // สถานะควบคุมการเปิด/ปิด Dialog
  const [newMessage, setNewMessage] = useState(""); // ข้อความใหม่ที่ต้องการแก้ไข

  const handleEdit = async () => {
    try {
      await EditMessage(messageId, newMessage); // เรียกฟังก์ชันแก้ไขข้อความ
      setIsOpen(false); // ปิด Dialog หลังจากแก้ไขสำเร็จ
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button type="button" className="mt-1.5">
          <CiEdit className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Message</DialogTitle>
          <DialogDescription>
            Edit your message here. Click "Edit" when you're done.
          </DialogDescription>
          <Input
            placeholder="Edit your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} // อัปเดตข้อความใหม่
          />
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={handleEdit}>
            <CiEdit />
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
