import img1 from "../../assets/images/get-apple-store.png"
import img2 from "../../assets/images/get-google-play.png"
export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 px-20 grid sm:grid-cols-1   ">
      <div className="container">
        <h2 className="text-3xl font-medium">Get the FreshCart app</h2>
        <p className="text-gray-600">
          We will send you a link, open it to your phone to download the app
        </p>
      </div>
      <div className=" items-center py-5 grid  md:grid-cols-2 gap-2 ">
        <input
          type="email"
          id="footer-email"
          className="bg-gray-50 border me-5  border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-[100%] sm:w-full p-2.5   dark:focus:ring-green-500 dark:focus:border-green-500"
          placeholder="Email"
        />

        <button
          type="submit"
          className="text-white bg-main  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm   px-16 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 sm:mt-1 dark:focus:ring-green-800 sm:w-auto"
        >
          Share app kink
        </button>
      </div>
      <div className="md:flex border-y-2 md py-5 justify-between">
        <p className="">Payment Methods</p>
        <div className=" md:flex md:justify-between ">
          <p className="me-1">Get delivers whit fresh cart</p>
        <img src={img1} className="w-28 h-6" alt="" />
        <img src={img2}  className="w-28 h-6" alt="" />
        </div>
      </div>
    </footer>
  );
}
