import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, BookOpen, TrendingUp } from 'lucide-react';

export default function SchoolProgress() {
  const progressItems = [
    {
      id: '1',
      bookTitle: 'Mathematics Grade 8',
      subject: 'Mathematics',
      grade: 'Grade 8',
      status: 'in-progress',
      progress: 75,
      lessonsCompleted: 15,
      totalLessons: 20,
    },
    {
      id: '2',
      bookTitle: 'Science Grade 9',
      subject: 'Science',
      grade: 'Grade 9',
      status: 'in-progress',
      progress: 60,
      lessonsCompleted: 12,
      totalLessons: 20,
    },
    {
      id: '3',
      bookTitle: 'English Grade 7',
      subject: 'English',
      grade: 'Grade 7',
      status: 'completed',
      progress: 100,
      lessonsCompleted: 18,
      totalLessons: 18,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary-light text-primary';
      case 'in-progress':
        return 'bg-secondary-light text-secondary';
      case 'not-started':
        return 'bg-muted text-muted-foreground';
      default:
        return '';
    }
  };

  const overallProgress =
    progressItems.reduce((sum, item) => sum + item.progress, 0) /
    progressItems.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Learning Progress</h1>
        <p className="text-muted-foreground mt-2">
          Track your learning journey across all books
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Progress
            </CardTitle>
            <TrendingUp className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{overallProgress.toFixed(0)}%</div>
            <p className="text-sm text-muted-foreground mt-1">
              Across all subjects
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Books in Progress
            </CardTitle>
            <BookOpen className="w-5 h-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {progressItems.filter((item) => item.status === 'in-progress').length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Currently studying
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Books
            </CardTitle>
            <CheckSquare className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {progressItems.filter((item) => item.status === 'completed').length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Finished successfully
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Subject Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {progressItems.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.bookTitle}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.grade}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.subject}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{item.progress}%</p>
                    <p className="text-sm text-muted-foreground">
                      {item.lessonsCompleted}/{item.totalLessons} lessons
                    </p>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

