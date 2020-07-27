import React, {useState, useEffect, Fragment} from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from './models/activity';
import NavBar from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';

const App =()=>{
  const[activities, setActivities]=useState<IActivity[]>([]);
  const [selectedActivity, SetSelectedActivity]= useState<IActivity | null>(null);
  const[editMode, setEditMode]= useState(false);

  const handleSelectActivity=(id : string)=>{
    SetSelectedActivity(activities.filter(a=> a.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm=()=>{
    SetSelectedActivity(null);
    setEditMode(true);
  }
  const handleCreateActivity=(activity: IActivity)=>{
    setActivities([...activities, activity]);
    SetSelectedActivity(activity);
    setEditMode(false);
  }
  const handleEditActivity=(activity: IActivity)=>{
    setActivities([...activities.filter(a=>a.id !== activity.id), activity]);
    SetSelectedActivity(activity);
    setEditMode(false);
  }
  const handleDeleteActivity= (id :string)=>{
    setActivities([...activities.filter(a=>a.id !== id)]);
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then((response)=>{ 
    setActivities(response.data);
    let activities : IActivity[]=[];
    response.data.forEach(activity=>{
      activity.date = activity.date.split('.')[0];
      activities.push(activity);
    })
    setActivities(activities);
    });
  }, []); 
  return (
    <Fragment>
    <NavBar openCreateForm={handleOpenCreateForm}/>
    <Container style={{marginTop: '7em'}}>
    <ActivityDashboard activities={activities}
     selectActivity={handleSelectActivity}
     selectedActivity={selectedActivity} 
     editMode={editMode}
     setEditMode={setEditMode}
     setSelectedActivity={SetSelectedActivity}
     createActivity={handleCreateActivity}
     editActivity={handleEditActivity}
     deleteActivity={handleDeleteActivity}/>
    </Container> 
    </Fragment>
  );
  }

export default App;
