import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Image, Video, Plus, Eye } from 'lucide-react';

export default function SchoolActivities() {
  const activities = [
    {
      id: '1',
      title: 'Science Experiment - Photosynthesis',
      bookTitle: 'Science Grade 9',
      mediaType: 'video',
      createdAt: '2024-01-20',
      status: 'approved',
    },
    {
      id: '2',
      title: 'Math Project - Geometry Shapes',
      bookTitle: 'Mathematics Grade 8',
      mediaType: 'image',
      createdAt: '2024-01-18',
      status: 'pending',
    },
    {
      id: '3',
      title: 'English Presentation - Storytelling',
      bookTitle: 'English Grade 7',
      mediaType: 'video',
      createdAt: '2024-01-15',
      status: 'approved',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-primary-light text-primary';
      case 'pending':
        return 'bg-secondary-light text-secondary';
      case 'rejected':
        return 'bg-destructive/10 text-destructive';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activities</h1>
          <p className="text-muted-foreground mt-2">
            Upload and manage your learning activities
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Upload Activity
        </Button>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>My Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className="w-full h-32 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    {activity.mediaType === 'video' ? (
                      <Video className="w-12 h-12 text-white" />
                    ) : (
                      <Image className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <CardTitle className="text-base">{activity.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {activity.bookTitle}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Uploaded on {activity.createdAt}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Activity
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

