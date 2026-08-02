import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/providers/language-provider";
import { useLenisModal } from "@/hooks/use-lenis-modal";

interface AboutModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}