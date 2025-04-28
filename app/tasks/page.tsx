import { TaskHistory } from "@/components/task-history"
import { Header } from "@/components/header"

export default function TasksPage() {
  return (
    <>
      <Header />
      <main className="container py-6">
        <TaskHistory />
      </main>
    </>
  )
}
