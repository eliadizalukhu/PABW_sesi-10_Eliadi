import React from 'react';
import { ScrollView, View, Alert } from 'react-native';
import Header from '../Components/Header';
import CourseCard from '../Components/CourseCard';

interface Course {
  id: number;
  name: string;
  description: string;
}

const HomePage: React.FC = () => {
  const courses: Course[] = [
    { id: 1, name: 'React Native Basics', description: 'Learn the fundamentals of React Native development.' },
    { id: 2, name: 'Advanced Mobile Development', description: 'Explore advanced techniques in mobile app development.' },
    { id: 3, name: 'UI/UX for Mobile Apps', description: 'Design user-friendly and visually appealing mobile interfaces.' },
  ];

  return (
    <ScrollView>
      <Header />
      <View style={{ padding: 20 }}>
        {courses.map(course => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onPress={() => Alert.alert(`You selected ${course.name}`, course.description)} 
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomePage;
