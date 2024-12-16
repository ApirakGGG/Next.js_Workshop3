"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { Logout } from "./Button";
import { Popover, PopoverPanel, PopoverButton } from "@headlessui/react";
const ToggleModal = () => {
  const [isOpen, setIsOpen] = useState(false); // State สำหรับควบคุม Modal

  const toggleModal = () => {
    setIsOpen(!isOpen); // เปลี่ยนสถานะ Modal เป็น เปิด / ปิด
  };

  return (
    <>
      <Popover className="relative">
        {/* Popover button เปิด/ปิด Popoverpanal */}
        <PopoverButton className="gap-x-1 inline-flex items-center ">
          <IoIosArrowDown className="w-5 h-5" />
        </PopoverButton>
        <PopoverPanel
          transition // transition ทำให้เปิดแบบ smooth
          // -left ทำให้ขยับออกจากขอบจอ
          // -right ทำให้ขยับออกจากขอบจอ
          className="absolute -left-40 z-10 mt-8 -translate-x-1/2 px-4 transition
        data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in
        "
        >
          {/* max-w กำหนดขอบPopover */}
          <div className="w-screen max-w-[35vh] flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              <div className="grop relative flex gap-x-6 p-3 rounded-lg">
                <div className="mt-1 flex gap-2 items-center justify-center rounded-lg">
                  <div className=" items-center gap-2">
                  <p className="font-bold py-2">Logout</p>
                  <div className="flex mx-auto items-center gap-2 ">
                      {/* Logout icon */}
                      <CiLogout className="w-6 h-6" />
                    {/* logout button */}
                    <Logout />
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </Popover>
    </>
  );
};

export default ToggleModal;
