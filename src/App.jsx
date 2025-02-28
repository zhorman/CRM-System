import styles from './styles/App.module.css';
import TodoListPage from './pages/TodoListPage';

function App() {
  return (
    <div className={styles.container}>
      <TodoListPage />
    </div>
  );
}

export default App;
