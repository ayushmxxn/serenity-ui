'use client'
import React, { useState, ChangeEvent, FormEvent } from "react";
import useMeasure from "react-use-measure";
import { Inter } from 'next/font/google';
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";

const inter = Inter({ subsets: ['latin'], weight: '500' });

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      await sendEmail(formData);
      console.log("Email sent successfully!");
      setOpen(false);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.log("Failed to send email.");
      console.error("Email Error:", error);
    }
  };

  const sendEmail = async (data: FormData) => {
    // Handle your email sending logic here
  };

  return (
    <div className="grid py-8 place-content-center bg-black">
      <button
        className={`bg-black text-white border-2 border-zinc-500 px-5 py-2 rounded-full flex justify-center items-center gap-2 z-50`}
        onClick={() => setOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
        Contact Me
      </button>

      <CloseDrawer open={open} setOpen={setOpen}>
        <div className={`mx-auto max-w-sm space-y-4 text-zinc-100 ${inter.className}`}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="font-medium">Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full mt-1 px-3 py-2 border border-zinc-700 rounded-md bg-black/50 backdrop-blur-sm text-neutral-100 focus:outline-none focus:border-zinc-500"
              />
            </label>
            <label className="block">
              <span className="font-medium">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full mt-1 px-3 py-2 border border-zinc-700 rounded-md bg-black/50 backdrop-blur-sm text-neutral-100 focus:outline-none focus:border-zinc-500"
              />
            </label>
            <label className="block">
              <span className="font-medium">Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="block w-full mt-1 px-3 py-2 border border-zinc-700 rounded-md bg-black/50 backdrop-blur-sm text-neutral-100 h-32 resize-none focus:outline-none focus:border-zinc-500"
              ></textarea>
            </label>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white border border-zinc-700 py-2 px-4 w-full rounded-md transition-colors hover:bg-zinc-800 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gray-100 text-black py-2 px-4 w-full rounded-md transition-colors hover:bg-gray-200"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </CloseDrawer>
    </div>
  );
};

interface CloseDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const CloseDrawer: React.FC<CloseDrawerProps> = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-black border-t border-zinc-700"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-black p-4">
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-zinc-800 active:cursor-grabbing"
              ></button>
            </div>
            <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ContactDrawer;