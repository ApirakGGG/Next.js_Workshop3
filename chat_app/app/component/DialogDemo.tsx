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
import { IoTrashBin } from "react-icons/io5";

interface DialogProps {
  messageId: string; // ID ของข้อความที่ต้องการลบ
  deleteMessage: (id: string) => void; // ฟังก์ชันลบข้อความ
}

/*
 * ส่งprops components แม่เพื่อ รับค่าจาก components แม่ สำหรับสร้างfunction
 */
export function DialogDemo({ messageId, deleteMessage }: DialogProps) {
  return (
    <Dialog>
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
           onClick={() => deleteMessage(messageId)}>
            <IoTrashBin />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
