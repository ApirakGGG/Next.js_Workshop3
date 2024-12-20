"use client";
import React, { useRef } from "react";
import { PostData } from "../action/Post_Data";

const From = () => {
// กำหนดRef อ้างอิงElement
const fromRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <form action={
        async (fromData) => {
          await PostData(fromData);
          // reset from
          fromRef.current?.reset();
        }
      } className="p-6 fixed bottom-0 left-0 w-full bg-white">
        <div className="flex">
          <input
            type="text"
            name="message"
            placeholder="type something..."
            className="flex-grow py-2 px-4  outline-none rounded-lg"
          />
          <button
            type="submit"
            className="bg-sky-300 hover:bg-sky-400 rounded-lg min-w-[10vh]"
          >
            send
          </button>
        </div>
      </form>
    </>
  );
};

export default From;