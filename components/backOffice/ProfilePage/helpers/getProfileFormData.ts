import { Profile } from "@hooks/useMyProfile";

export type ProfileFormData = {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  tagLine: string;
  price: string;
  tags: string[];
};

function getProfilFormData(profile: Profile): ProfileFormData {
  return {
    email: profile?.email ?? "",
    firstName: profile?.firstName ?? "",
    lastName: profile?.lastName ?? "",
    country: profile?.photographer?.country ?? "",
    city: profile?.photographer?.city ?? "",
    tagLine: profile?.photographer?.tagLine ?? "",
    price: profile?.photographer?.price?.toString() ?? "",
    tags: (profile?.photographer?.tags ?? []).map(tag => tag.toString()),
  };
}

export default getProfilFormData;
