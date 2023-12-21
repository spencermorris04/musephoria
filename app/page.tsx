import { getServerSession } from "next-auth/next";
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  const feedbackTimeline = [
    {
      id: 1,
      content: 'Received positive feedback on',
      target: 'Summer Melody',
      date: 'Mar 10',
    },
    {
      id: 2,
      content: 'Gave constructive feedback on',
      target: 'Echoes of the Night',
      date: 'Mar 8',
    },
    {
      id: 3,
      content: 'Received mixed feedback on',
      target: 'City Lights',
      date: 'Mar 5',
    },
    // ... add more items as needed
  ];
  

  const leaderboard = [
    {
      name: 'Alex',
      points: 350,
    },
    {
      name: 'Jordan',
      points: 300,
    },
    {
      name: session?.user?.name || 'You', // Replace with session user's name
      points: 250,
    },
    {
      name: 'Casey',
      points: 200,
    },
    {
      name: 'Taylor',
      points: 150,
    },
    // ... add more items as needed
  ];
  

  const recentProjects = [
    {
      id: 'p1',
      title: 'Rainy Days',
      description: 'An acoustic journey through rain-soaked streets.',
    },
    {
      id: 'p2',
      title: 'Neon Dreams',
      description: 'A synthwave exploration.',
    },
    {
      id: 'p3',
      title: 'Mountain Echo',
      description: 'Folk-inspired melodies from the heart of nature.',
    },
    // ... add more items as needed
  ];
  

  return (
    <div className="grid grid-cols-3 gap-4 p-8 bg-gradient-to-r from-red-950 to-stone-900 h-full">
      {/* Feedback Column */}
      <div className="col-span-1">
        <h2 className="text-xl font-bold mb-4">Recent Feedback</h2>
        <ul role="list" className="-mb-8">
          {feedbackTimeline.map((event, eventIdx) => (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== feedbackTimeline.length - 1 ? (
                  <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                ) : null}
                <div className="relative flex space-x-3">
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <p className="text-sm text-gray-500">
                      {event.content} <strong>{event.target}</strong>
                    </p>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <time>{event.date}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Progress Column */}
      <div className="col-span-1">
        <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
        <ol className="space-y-3">
          {leaderboard.map((user, index) => (
            <li key={user.name} className="flex items-center">
              <span className={`text-xl font-bold mr-2`}>{index + 1}</span>
              <span className="flex-1 font-semibold">{user.name}</span>
              <span className="text-gray-500">{user.points} XP</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Projects Column */}
      <div className="col-span-1">
        <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
        <ul role="list" className="space-y-4">
          {recentProjects.map((project) => (
            <li key={project.id}>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-500">{project.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
