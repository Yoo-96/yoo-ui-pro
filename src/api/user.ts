import { UserInfoType } from '@/types/user';

export const fetchUsetInfo = async (name: string): Promise<UserInfoType> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: name,
        desc: `hi, ${name}`,
      });
    }, 1000);
  });
};
