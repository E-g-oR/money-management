import { FC, ReactNode, createContext, useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

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
  const [title, setTitle] = useState("Confirm");
  const [description, setDescription] = useState("Are you sure about this?");
  const [onConfirm, setOnConfirm] = useState<()=> void>(() => {});
  const confirm = useCallback(
    (payload: IConfirmPayload) => {
      console.log(payload);

      setTitle(payload.title);
      setDescription(payload.description);
      setOnConfirm(() => payload.onConfirm);
    },
    [setTitle, setDescription, setOnConfirm]
  );

  const onClose = useCallback(() => {
    setTitle("");
    setDescription("");
    setOnConfirm(() => {});
  }, []);

  return (
    <confirmModalContext.Provider value={{ confirm }}>
      {children}
      <Dialog
        open={!!(title && onConfirm)}
        onOpenChange={(isOpen) => {
          if (!isOpen) onClose();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-row gap-3 ml-auto">
            <Button>Cancel</Button>
            <Button
              variant={"destructive"}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </confirmModalContext.Provider>
  );
};

export default ConfirmModal;
