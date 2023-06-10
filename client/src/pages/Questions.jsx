import React from "react";

const Questions = () => {
  return (
    <div className="bg-gray-100 py-12 sm:px-6 lg:px-8 rounded-lg">
      <div className="sm:px-6 lg:px-8">
        <div className="">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Часто задаваемые вопросы
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            <div className="pt-6">
              <dt className="text-lg">
                <button className="text-left w-full flex justify-between items-start text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    Как сделать заказ?
                  </span>
                  <span className="ml-6 h-7 flex items-center">
                    <svg
                      className="rotate-0 h-6 w-6 transform transition-transform ease-out duration-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd className="mt-2 pr-12">
                <p className="text-base text-gray-500">
                  Для того, чтобы сделать заказ, перейдите на страницу нашего
                  магазина и выберите интересующий вас товар. Затем добавьте его
                  в корзину и оформите заказ, следуя инструкциям на сайте.
                </p>
              </dd>
            </div>

            <div className="pt-6">
              <dt className="text-lg">
                <button className="text-left w-full flex justify-between items-start text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    Какие способы оплаты вы принимаете?
                  </span>
                  <span className="ml-6 h-7 flex items-center">
                    <svg
                      className="rotate-0 h-6 w-6 transform transition-transform ease-out duration-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd className="mt-2 pr-12">
                <p className="text-base text-gray-500">
                  Мы принимаем оплату банковской картой, через систему PayPal и
                  наличными при получении товара.
                </p>
              </dd>
            </div>

            <div className="pt-6">
              <dt className="text-lg">
                <button className="text-left w-full flex justify-between items-start text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    Как я могу отследить свой заказ?
                  </span>
                  <span className="ml-6 h-7 flex items-center">
                    <svg
                      className="rotate-0 h-6 w-6 transform transition-transform ease-out duration-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd className="mt-2 pr-12">
                <p className="text-base text-gray-500">
                  После того, как ваш заказ будет отправлен, мы вышлем вам
                  электронное письмо с информацией о доставке и трекинг-номером
                  для отслеживания вашего заказа. Вы также можете отслеживать
                  состояние вашего заказа на странице «Мои заказы» на нашем
                  сайте.
                </p>
              </dd>
            </div>

            <div className="pt-6">
              <dt className="text-lg">
                <button className="text-left w-full flex justify-between items-start text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    Как я могу вернуть товар?
                  </span>
                  <span className="ml-6 h-7 flex items-center">
                    <svg
                      className="rotate-0 h-6 w-6 transform transition-transform ease-out duration-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd className="mt-2 pr-12">
                <p className="text-base text-gray-500">
                  Если вы не полностью удовлетворены своей покупкой, вы можете
                  вернуть товар в течение 30 дней с момента получения заказа.
                  Свяжитесь с нами, чтобы получить инструкции по возврату товара
                  и получить полный возврат средств.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Questions;
