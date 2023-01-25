import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: "dz3hyjjwm",
  api_key: "841494154198285",
  api_secret: "YaiCtksJJ6GW8zYOhQnbxZRzRO4",
  secure: true,
});

describe("pruebas en fileUpload", () => {
  test("debe de subir el archivo correctamente a cloudinary", async () => {
    const imageUrl =
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg";

    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "foto.jpg");

    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");

    const cloudResp = await cloudinary.api.delete_resources(
      ["journal/" + imageId],
      {
        resource_type: "image",
      }
    );
  });

  test("debe de retornar null", async () => {
    const file = new File([], "foto.jpg");

    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
