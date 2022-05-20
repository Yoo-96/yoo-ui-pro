import { UserInfoType, UserRequestResultType } from '@/types/user';

export const fetchUsetList = async (params: any): Promise<UserRequestResultType> => {
  return new Promise((resolve) => {
    const data: UserInfoType[] = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        id: i,
        name: `张三 ${i + 1}`,
        gender: i % 2,
        age: 13 + i,
        email: '123@163.com',
        phone: '15015015011',
        wx: '15015015011',
        address: '地球村',
      });
    }
    setTimeout(() => {
      resolve({
        result: {
          data,
          total: 20,
          currentPage: params.currentPage,
          pageSize: params.pageSize,
        },
        success: true,
      });
    }, 1000);
  });
};
