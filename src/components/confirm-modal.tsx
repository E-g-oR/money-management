import { createContext, FC, ReactNode, useCallback, useState } from "react";

import { useTranslation } from "@/hooks/useTranslation";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface IConfirmPayload {
  title: string;
  description: string;
  onConfirm: () => void;
}
interface IConfirmModalContext {
  confirm: (payload: IConfirmPayload) => void;
}
const confirmModalContextDefault: IConfirmModalContext = {
  confirm: () => {},
};
export const confirmModalContext = createContext<IConfirmModalContext>(
  confirmModalContextDefault
);

interface Props {
  children: ReactNode;
}
const ConfirmModal: FC<Props> = ({ children }) => {
  const t = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState(t.common.actions.submit);
  const [description, setDescription] = useState("Are you sure about this?");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const confirm = useCallback(
    (payload: IConfirmPayload) => {
      setTitle(payload.title);
      setDescription(payload.description);
      setOnConfirm(() => payload.onConfirm);
      setIsOpen(true);
    },
    [setTitle, setDescription, setOnConfirm, setIsOpen]
  );

  const onClose = useCallback(() => {
    // setTitle("");
    // setDescription("");
    setOnConfirm(() => {});
    setIsOpen(false);
  }, []);

  return (
    <confirmModalContext.Provider value={{ confirm }}>
      {children}
      <Dialog
        open={isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) onClose();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className={"flex flex-row gap-3 ml-auto"}>
            <Button onClick={onClose}>{t.common.actions.cancel}</Button>
            <Button
              variant={"destructive"}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {t.common.actions.submit}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </confirmModalContext.Provider>
  );
};

export default ConfirmModal;
