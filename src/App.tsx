import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { ToastContainer, toast, ToastContent, ToastOptions } from 'react-toastify';
import { LoginPage } from './pages/Login';
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute';



function App() {
  const [notificationQueue, setNotificationQueue] = useState<string[]>([]);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const pushNotification = (message: string) => {
    setNotificationQueue(prevState => [...prevState, message]);
  };

  // массив с предопределенными сообщениями
  const messages = ["Hello, world!", "Welcome to the notification app!", "New notification arrived!"];

  useEffect(() => {
    let messageIndex = 0;

    // функция, которая автоматически отправляет уведомления каждые 10 секунд
    let autoPushNotification: number
    if (isLoggedIn) {
      autoPushNotification = setInterval(() => {
        pushNotification(messages[messageIndex % messages.length]);
        messageIndex++;
      }, 5000);
    }


    // очищаем интервал при размонтировании компонента
    return () => clearInterval(autoPushNotification);
  }, [isLoggedIn]);

  useEffect(() => {
    if (notificationQueue.length > 0 && !isNotificationVisible) {
      const message: ToastContent = notificationQueue[0];
      const options: ToastOptions = {
        onClose: () => {
          setIsNotificationVisible(false);
          setNotificationQueue(prevState => prevState.slice(1));
        },
        autoClose: 5000,
        position: "bottom-center",
        // hideProgressBar: true,
      };
      toast.info(message, options);
      setIsNotificationVisible(true);
    }
  }, [notificationQueue, isNotificationVisible]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/" element={
            <PrivateRoute
              isLoggedIn={isLoggedIn}
            >
              <ToastContainer />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
