export type RegisterRequest = {
  phoneNumber :string
};

export type RegisterResponse = {
  message: string;
  success: boolean;
  data: {
    token: string;
  };
};


export type LoginRequest = {
  email?: string;
  phoneNumber?: string;
};

export type LoginResponse = {
  message: string;
  success : boolean
  data: {
    token: string;
  };
};

export type UserResponse = {
  id: string;
  name: string;
  email: string;
};
