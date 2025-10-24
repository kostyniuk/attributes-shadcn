"use client";
import { useForm } from "@tanstack/react-form";

interface HobbiesItem {
    name: string;
    description: string;
    yearsOfExperience: number;
}

export default function FormTanstackExample() {
    const form = useForm({
        defaultValues: {
            hobbies: [] as HobbiesItem[]
        },
        validators: {
            onBlur: (value) => {
                console.log(value.value);
            }
        }
    })
    return (
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
                            : hobbiesField.state.value.map((_, i) => (
                                <div key={i}>
                                    <form.Field
                                        name={`hobbies[${i}].name`}
                                        // eslint-disable-next-line react/no-children-prop
                                        children={(field) => {
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
                                                        onClick={() => hobbiesField.removeValue(i)}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            )
                                        }}
                                    />
                                    <form.Field
                                        name={`hobbies[${i}].description`}
                                        // eslint-disable-next-line react/no-children-prop
                                        children={(field) => {
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
                            ))}
                    </div>
                    <button
                        type="button"
                        onClick={() =>
                            hobbiesField.pushValue({
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
    )
}