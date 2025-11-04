import RegisterForm from "../components/RegisterForm";
import { UserToastComponent } from "../components/UserToast";


const RegisterPage = () => {
  return (
     <>
   <RegisterForm />
   <UserToastComponent />
   </>
  );
};

export default RegisterPage;