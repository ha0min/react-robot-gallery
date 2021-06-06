import React, {useEffect, useState} from 'react';
import styles from './App.module.css'
import logo from './assets/images/logo.svg';
import Robot from "./components/Robot";
import RobotDiscount from "./components/RobotDiscount";
import Cart from "./components/Cart";


interface Props {
}

interface State {
    robotGallery: any[],
    count: number
}

const App: React.FC = (props) => {
    const [count, setCount] = useState<number>(0)
    const [robotGallery, setRobotGallery] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    useEffect(() => {
        document.title = `点击${count}次`
    }, [count])

    useEffect(() => {
        // fetch("https://jsonplaceholder.typicode.com/users")
        //     .then(response => response.json())
        //     .then(data => setRobotGallery(data))

        const fetchData = async () => {
            try {
                setLoading(true);
                const responses = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await responses.json();
                setRobotGallery(data);
                setLoading(false);
            } catch (e) {
                console.log(e);
                setError(e.message)
            }
        };

        fetchData();

    }, [])

    return (
        <div className={styles.app}>
            <div className={styles.appHeader}>
                <img src={logo} className={styles.appLogo} alt="logo"/>
                <h1>购物平台</h1>
            </div>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >Click
            </button>
            <span>count: {count}</span>

            <Cart></Cart>

            {
                !error || error !== "" && <div>网站出错:{error}</div>
            }

            {!loading ?

                (<div className={styles.robotList}>
                    {robotGallery.map((r: any, index: any) => (
                        index % 2 !== 0 ?
                        <Robot key={r.id} id={r.id} email={r.email} name={r.name}/>
                        : <RobotDiscount key={r.id} id={r.id} email={r.email} name={r.name}></RobotDiscount>
                    ))}
                </div>)
                : (<h2>加载中</h2>)
            }
        </div>
    );


}

export default App;
