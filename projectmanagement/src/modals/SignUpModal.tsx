import React, { type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userService from "../services/userService";
import {  Role, type UserRegistrationData } from "../types/models";
import CustomModal from "./CustomModal";

// interface UserRegistrationData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: Role;
//   password: string;
//   companyName: string;
// }

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const SignUpModal: FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserRegistrationData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: Role.DEVELOPER,
      password: "",
      companyName: "",
    },
  });
  const { data: roles, isLoading: loadingTypes } = useQuery({
    queryKey: ["Role"],
    queryFn: userService.getUserTypes,
    enabled: isOpen,
  });
  const registerMutation = useMutation<void, Error, UserRegistrationData>({
    mutationFn: (userData) => userService.createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Role"] });
      alert(
        "Registratie voltooid. Sluit dit scherm om vervolgens in te loggen."
      );
      reset();
      onClose();
    },
    onError: (error) => {
      console.error(error); // <- log for debugging
      alert(`Registratie mislukt: ${error.message}`);
    },
  });
  const onSubmit: SubmitHandler<UserRegistrationData> = (data) => {
    registerMutation.mutate(data)
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Sign Up"
      size="medium"
      overlayStyle="dark"
    >
        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
          <div className="signup-group">
            <label htmlFor="firstName"> First Name : </label>
            <input
              {...register("firstName", { required: true })}
              placeholder="First Name"
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>
          <div className="signup-group">
            <label htmlFor="lastName"> Last Name : </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", {
                required: "Veld Verplicht",
                minLength: { value: 2, message: "minimum of 2 chars" },
              })}
              placeholder="Last name"
              className={errors.lastName ? "input error " : ""}
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName.message}</span>
            )}
          </div>
          <div className="signup-group">
            <label htmlFor="email"> E-mail : </label>
            <input
              type="text"
              id="email"
              {...register("email", {
                required: "Veld Verplicht",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Ongeldig email adres.",
                },
              })}
              placeholder="Email"
              className={errors.email ? "input error " : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>
          {/* sign up userType enum! */}
          <div className="form-group">
            <label htmlFor="role">Role : *</label>
            <select
              id="role"
              {...register("role", {
                required: "Selecteer een gebruikerstype",
              })}
              className={errors.role ? "input-error" : ""}
            >
              <option value="">Selecteer Rol</option>
              {roles && roles.length > 0 ? (
                roles.map((type) => (
                  <option key={type} value={type}>
                    {type === "DEVELOPER" && "Developer"}
                    {type === "PROJECT_LEADER" && "Project Leader"}
                    {type === "CUSTOMER" && "Customer"}
                  </option>
                ))
              ) : (
                <option disabled>No roles available</option>
              )}
            </select>
            {errors.role && (
              <span className="error-message">{errors.role.message}</span>
            )}
          </div>
          {/* company name */}
          <div className="signup-group">
            <label htmlFor="companyName"> Company name : </label>
            <input
              type="text"
              id="companyName"
              {...register("companyName", {
                required: "Veld Verplicht",
                minLength: { value: 2, message: "minimum of 2 chars" },
              })}
              placeholder="Company Name"
              className={errors.companyName ? "input error" : ""}
            />
            {errors.companyName && (
              <span className="error-messsage">
                {errors.companyName.message}
              </span>
            )}
          </div>
          {/* Password section */}
          <div className="signup-group">
            <label htmlFor="password"> Password : </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Veld Verplicht",
                minLength: { value: 6, message: "minimum of 6 chars" },
              })}
              placeholder="Password"
              className={errors.password ? "input error " : ""}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>
          {/* <div className='signup-group'>
<label htmlFor="confirmPassword"> Confirm Password : </label>
<input type="password" id='confirmPassword' {...register("confirmPassword", {
                          required: "Veld Verplicht",
                          validate: (value) => value === password || "Passwords do not match"
                      })}
                      placeholder='Confirm Password'
                      className={errors.confirmPassword ? 'input error ' : ""}
                      />
                      {errors.confirmPassword && <span className='error-message'>{errors.confirmPassword.message}</span>}
</div> */}
          {/* submit button */}
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
      </CustomModal>
  );
};
export default SignUpModal;