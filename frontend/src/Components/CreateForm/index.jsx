import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUrlRequest,
  registerUrlSuccess,
  registerUrlFailure,
} from "../../Redux/Slices/UrlSlices";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function CreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.newUrl);
  const onSubmit = async (data) => {
    const newurlData = {
      longUrl: data.longUrl,
      alias: data.alias,
      category: data.category,
    };
    try {
      dispatch(registerUrlRequest());
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/api/shorten`,
          newurlData,
          config
        );
        console.log("res", res.data);
        dispatch(registerUrlSuccess(res.data));
      } else {
        const res = await axios.post(`/api/v1/api/shorten`, newurlData, config);
        console.log("res", res.data);
        dispatch(registerUrlSuccess(res.data));
      }
    } catch (error) {
      dispatch(registerUrlFailure(error.response.data));
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error.message);
      toast.error(error?.message);
    }
    if (success) {
      console.log("success", success);
    }
  }, [error, success]);
  return (
    <Card
      className=" h-screen flex items-center justify-center"
      color="transparent"
      shadow={true}
    >
      <Typography variant="h4" color="blue-gray">
        Shorten
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Long URL
          </Typography>
          <Input
            size="lg"
            type="text"
            placeholder="Long URL"
            {...register("longUrl", { required: "URL is required" })}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.longUrl && (
            <p className="my-2 text-red-600">{errors.longUrl.message}</p>
          )}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Alias
          </Typography>
          <Input
            type="text"
            size="lg"
            placeholder="Alias"
            {...register("alias", { maxLength: 8, minLength: 4 })}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Topic/ Category
          </Typography>
          <Input
            type="text"
            size="lg"
            placeholder="Category"
            {...register("category", { required: false })}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        <Button className="mt-6" fullWidth type="submit">
          Shorten URL
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <Link to="/login" href="#" className="font-medium text-gray-900">
            Sign Up
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
