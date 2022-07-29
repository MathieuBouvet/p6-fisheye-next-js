import { UserData } from "@lib/controllers/users/helpers/userValidations";
import { ProfileFormData } from "@components/backOffice/ProfilePage/helpers/getProfileFormData";

function getUserData({
  city,
  country,
  tagLine,
  price,
  tags,
  ...user
}: ProfileFormData): UserData {
  return {
    ...user,
    photographer: {
      city,
      country,
      tagLine,
      price: parseInt(price),
      tags: tags.map(tag => Number(tag)),
    },
  };
}

export default getUserData;
