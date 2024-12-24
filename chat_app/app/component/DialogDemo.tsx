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
import { useState } from "react";
import { IoTrashBin } from "react-icons/io5";

interface DialogProps {
  messageId: string; // ID ของข้อความที่ต้องการลบ
  deleteMessage: (id: string) => void; // ฟังก์ชันลบข้อความ
}

/*
 * ส่งprops components แม่เพื่อ รับค่าจาก components แม่ สำหรับสร้างfunction
 */
export function DialogDemo({ messageId, deleteMessage }: DialogProps) {
   const [isOpen, setIsOpen] = useState(false); // สถานะควบคุมการเปิด/ปิด Dialog

   const handleEdit = async () => {
    try {
      await deleteMessage(messageId, ); // เรียกฟังก์ชันแก้ไขข้อความ
      setIsOpen(false); // ปิด Dialog หลังจากแก้ไขสำเร็จ
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button type="submit" className="mt-1.5 ">
          <IoTrashBin className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Message</DialogTitle>
          <DialogDescription>
            Delete your message here. Click Delete when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* // เรียกฟังก์ชันลบข้อความ */}
          <Button type="submit"
           onClick={() => handleEdit}>
            <IoTrashBin />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
