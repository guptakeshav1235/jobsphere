import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const UpdateProfileModal = ({ open, setOpen, authUser }) => {
    const closeModal = () => setOpen(false);
    const queryClient = useQueryClient();

    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        bio: "",
        skills: "",
        file: null,
        imageFile: null
    });

    const { mutate: updateProfile, isPending: isUpdate } = useMutation({
        mutationFn: async (formData) => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/user/profile/update`, {
                    method: "POST",
                    body: formData,
                    credentials: "include"
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.error || "Something went wrong");
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: (data) => {
            toast.success("Profile Updated successfully");
            //refetch the authUser
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            setOpen(false);
            console.log("Form Data: ", data);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const { name, files } = e.target;
        setInput({ ...input, [name]: files?.[0] });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        if (input.file) {
            formData.append("file", input.file);
        }

        if (input.imageFile) {
            formData.append("imageFile", input.imageFile);
        }
        updateProfile(formData)
    }

    useEffect(() => {
        if (authUser) {
            setInput({
                fullName: authUser?.fullName,
                email: authUser?.email,
                phoneNumber: authUser?.phoneNumber,
                bio: authUser?.profile?.bio,
                skills: authUser?.profile?.skills?.map(skill => skill),
                file: authUser?.profile?.resume,
                imageFile: authUser?.profile?.profilePhoto
            });
        }
    }, [authUser]);
    return (
        <div>
            {open && (
                <div className="modal modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-box" onClick={(e) => e.stopPropagation()} >
                        {/* Modal Header */}
                        <h3 className="font-bold text-lg">Update Profile</h3>

                        {/* Close Button */}
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={closeModal}
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        {/* Modal Content */}
                        <form onSubmit={submitHandler} className="mt-4">
                            {/* Name Field */}
                            <div className="grid gap-4 py-4">
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <label className="label">
                                        <span className="label-text font-medium">FullName</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={input.fullName}
                                        onChange={changeEventHandler}
                                        className="col-span-3 input input-bordered w-full"
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <label className="label">
                                        <span className="label-text font-medium">Email</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className="col-span-3 input input-bordered w-full"
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <label className="label">
                                        <span className="label-text font-medium">PhoneNumber</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        className="col-span-3 input input-bordered w-full"
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <label className="label">
                                        <span className="label-text font-medium">Bio</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="bio"
                                        value={input.bio}
                                        onChange={changeEventHandler}
                                        className="col-span-3 input input-bordered w-full"
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <label className="label">
                                        <span className="label-text font-medium">Skills</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={input.skills}
                                        onChange={changeEventHandler}
                                        className="col-span-3 input input-bordered w-full"
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <label className="label">
                                        <span className="label-text font-medium">Resume</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept='application/pdf'
                                        name="file"
                                        onChange={changeFileHandler}
                                        className="col-span-3 w-full"
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <label className="label">
                                        <span className="label-text font-medium">ProfilePhoto</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept='image/*'
                                        name="imageFile"
                                        onChange={changeFileHandler}
                                        className="col-span-3 w-full"
                                    />
                                </div>
                            </div>
                            {/* Submit Button */}
                            {
                                isUpdate ?
                                    <button className="btn btn-primary w-full my-2" >
                                        <LoadingSpinner />
                                        Please Wait
                                    </button> :
                                    <button type="submit" className="btn btn-primary w-full my-2">
                                        Update
                                    </button>
                            }
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProfileModal;
