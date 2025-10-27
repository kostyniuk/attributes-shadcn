import { useSortable } from "@dnd-kit/react/sortable";
import { Grip } from "lucide-react";

export const DraggableItem = ({ id, index, children }: { id: string, index: number, children: React.ReactNode }) => {
    const { ref, isDragging } = useSortable({ id, index });

    return (
        <div ref={ref} className={`flex items-center gap-2 ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
            <Grip className="size-4 cursor-grab" />
            {children}
        </div>
    )
}