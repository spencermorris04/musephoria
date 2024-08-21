// app/[medium]/[genre]/[skill]/feedback/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { getQuestions } from '~/utils/questions'
import { MusicFeedback } from './MusicFeedback'
import { WritingFeedback } from './WritingFeedback'
import { ActingFeedback } from './ActingFeedback'

export default function FeedbackPage() {
  const params = useParams();
  const medium = params.medium as string;
  const genre = params.genre as string;
  const skill = params.skill as string;

  const questions = getQuestions(medium, genre, skill);

  const FeedbackComponent = (() => {
    switch (medium) {
      case 'music':
        return MusicFeedback;
      case 'writing':
        return WritingFeedback;
      case 'acting':
        return ActingFeedback;
      default:
        return null;
    }
  })();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Feedback Page</h1>
      
      {FeedbackComponent ? (
        <FeedbackComponent questions={questions} />
      ) : (
        <p>Invalid medium selected.</p>
      )}
      
      <div className="bg-gray-100 p-4 rounded mt-8">
        <h3 className="text-xl font-bold mb-2">Debug Info:</h3>
        <p>Medium: {medium}</p>
        <p>Genre: {genre}</p>
        <p>Skill: {skill}</p>
        <p>Number of questions: {questions.length}</p>
      </div>
    </div>
  )
}