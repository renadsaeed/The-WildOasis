import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("not cabin fatched");
  }

  return data;
}

export async function createCabin(cabindata, id) {
  //https://wzjnxnvbkmzbwckisfjo.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg
  //https://wzjnxnvbkmzbwckisfjo.supabase.co/storage/v1/object/public/cabins-images/0.4546919982367149-cabin-009.jpg
  
  console.log("ccccca", cabindata);

  const imageName = `${Math.random()}-${cabindata.image.name}`.replaceAll(
    "/",
    "",
  );
  const isurl = cabindata?.image?.startsWith?.(supabaseUrl);
  const imagePath = isurl
    ? cabindata.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;
  //createcabin
  let query = await supabase.from("Cabins");
  if (!id) {
    query = query.insert([{ ...cabindata, image: imagePath }]).select();
  }
  //editCabin
  if (id) {
    query = query
      .update({ ...cabindata, image: imagePath })
      .eq("id", id)
      .select();
  }
  const { data, error } = await query;
  if (error) {
    console.log(error);
    throw new Error("Cabin not created");
  }
  if (isurl) return data;
  const { storageerror } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, cabindata.image);
  if (storageerror) {
    const { deleteerror, data } = await supabase
      .from("Cabins")
      .delete()
      .eq("id", data.id);
  }
  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("Cabins").delete().eq("id", id);
  if (error) {
    throw new Error("not cabin fatched");
  }
  return data;
}
