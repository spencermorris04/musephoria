// app/[medium]/[genre]/[skill]/feedback/MusicFeedback.tsx
import { Question } from '~/utils/questions'

export function MusicFeedback({ questions }: { questions: Question[] }) {
  return (
    <div className="bg-blue-100 p-4 rounded">
      <h2 className="text-2xl font-bold mb-4">Music Questions</h2>
      {questions.length > 0 ? (
        <ul className="list-disc pl-5">
          {questions.map((question) => (
            <li key={question.id} className="mb-2">
              <p>{question.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sample questions available for this combination.</p>
      )}
    </div>
  )
}