"use client";
import { useForm } from "@tanstack/react-form";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { move } from '@dnd-kit/helpers';
interface HobbiesItem {
    id: number | string;
    name: string;
    description: string;
    yearsOfExperience: number;
}

interface SortableHobbyItemProps {
    hobby: HobbiesItem;
    index: number;
    hobbiesField: any;
}

function SortableHobbyItem({ hobby, index, hobbiesField }: SortableHobbyItemProps) {
    const { ref, isDragging } = useSortable({ id: hobby.id, index });

    return (
        <div key={hobby.id} ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <hobbiesField.form.Field
                name={`hobbies[${index}].name`}
                // eslint-disable-next-line react/no-children-prop
                children={(field: any) => {
                    return (
                        <div>
                            <label htmlFor={field.name}>Name:</label>
                            <input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => hobbiesField.removeValue(index)}
                            >
                                X
                            </button>
                        </div>
                    )
                }}
            />
            <hobbiesField.form.Field
                name={`hobbies[${index}].description`}
                // eslint-disable-next-line react/no-children-prop
                children={(field: any) => {
                    return (
                        <div>
                            <label htmlFor={field.name}>Description:</label>
                            <input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </div>
                    )
                }}
            />
        </div>
    );
}

export default function FormTanstackExample() {
    const hobbies = [
        {
            id: 1,
            name: 'Reading',
            description: 'Reading is a hobby of mine',
            yearsOfExperience: 10
        },
        {
            id: 2,
            name: 'Writing',
            description: 'Writing is a hobby of mine',
            yearsOfExperience: 5
        },
        {
            id: 3,
            name: 'Coding',
            description: 'Coding is a hobby of mine',
            yearsOfExperience: 3
        }
    ]

    const form = useForm({
        defaultValues: {
            hobbies: hobbies as HobbiesItem[]
        },
        onSubmit: (values) => {
            console.log('onSubmit', values);
        }
    })
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
        }}>
            <DragDropProvider onDragEnd={(event) => {
                const ids = form.state.values.hobbies.map((hobby) => hobby.id);
                const movedIds = move(ids, event);
                const reorderedHobbies = movedIds.map((id) =>
                    form.state.values.hobbies.find((hobby) => hobby.id === id)!
                );
                form.setFieldValue('hobbies', reorderedHobbies);
            }}>
                <form.Field
                    name="hobbies"
                    mode="array"
                    // eslint-disable-next-line react/no-children-prop
                    children={(hobbiesField) => (
                        <div>
                            Hobbies
                            <div>
                                {!hobbiesField.state.value.length
                                    ? 'No hobbies found.'
                                    : hobbiesField.state.value.map((hobby, i) => (
                                        <SortableHobbyItem
                                            key={hobby.id}
                                            hobby={hobby}
                                            index={i}
                                            hobbiesField={hobbiesField}
                                        />
                                    ))}
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    hobbiesField.pushValue({
                                        id: `temp-${crypto.randomUUID()}`,
                                        name: '',
                                        description: '',
                                        yearsOfExperience: 0,
                                    })
                                }
                            >
                                Add hobby
                            </button>
                        </div>
                    )}
                />
                <button
                    type="submit"
                >
                    Submit
                </button>
            </DragDropProvider >
        </form>
    )
}