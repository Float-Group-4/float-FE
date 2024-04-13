import React, { useEffect, useState } from 'react';
import designImage from '@base/assets/imgs/Design team-bro.png';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useController, useForm } from 'react-hook-form';
import { useSnackBar } from '@base/hooks/useSnackbar';
import axios from 'axios';
import { URLSearchParams } from 'url';

export default function TutorialPage() {
  const navigate = useNavigate();
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const params = useParams();
  const [steps, setStep] = useState({
    stepsItems: ['Sign Up', 'Add Project', 'Add People'],
    currentStep: 1,
  });
  const [teamMemberId, setTeamMemberId] = useState('');
  const [teamId, setTeamId] = useState('');

  useEffect(() => {
    if (params.teamId) setTeamId(params.teamId);
    fetchTeamOwnerId(params.teamId || '');
  }, []);

  const fetchTeamOwnerId = async (teamId: string) => {
    try {
      const endpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/team/${teamId}`;
      const res = await axios.get(endpoint);
      console.log(res);
      if (res.data.teamOwnerId) setTeamMemberId(res.data.teamOwnerId);
    } catch (err: any) {
      console.log('ERROR: ', err.message);
      enqueueErrorBar(err.message || '');
    }
  };

  const signUpFormMethods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      people: '',
      describes: '',
    },
  });

  const { field: people } = useController({
    name: 'people',
    control: signUpFormMethods.control,
    rules: {
      required: true,
    },
  });

  const { field: describes } = useController({
    name: 'describes',
    control: signUpFormMethods.control,
    rules: {
      required: true,
    },
  });

  const addProjectFormMethods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
    },
  });

  const { field: projectName } = useController({
    name: 'name',
    control: addProjectFormMethods.control,
    rules: {
      required: true,
    },
  });

  const addPeopleFormMethods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      people: [],
      memberName: '',
    },
  });

  const { field: memberName } = useController({
    name: 'memberName',
    control: addPeopleFormMethods.control,
    rules: {
      required: true,
    },
  });

  const numPeopleOptions = [
    {
      name: '1-9',
      value: '1-9',
    },
    {
      name: '10-24',
      value: '10-24',
    },
    {
      name: '25-49',
      value: '25-49',
    },
    {
      name: '50+',
      value: '50+',
    },
  ];

  const describesOptions = [
    {
      name: 'New to us',
      description: 'Guide my setup',
      value: 0,
    },
    {
      name: 'Need an expert',
      description: 'A team member will email you',
      value: 1,
    },
    {
      name: 'Already use app',
      description: "I known what I'm doing",
      value: 2,
    },
  ];

  const stepContents = [
    <div>
      <h1 className='text-3xl font-semibold'>Help us understand your needs</h1>
      <div className='my-8'>
        <p className='text-lg '>How many people are you scheduling?</p>
        <div className=''>
          <ul className='mt-6 flex gap-4'>
            {numPeopleOptions.map((item, idx) => (
              <li key={idx}>
                <label htmlFor={item.name} className='block relative'>
                  <input
                    id={item.name}
                    type='radio'
                    onChange={(e) => {
                      console.log(e);
                    }}
                    defaultChecked={idx == 0 ? true : false}
                    name='people'
                    className='sr-only peer'
                  />
                  <div className='w-full p-5 cursor-pointer rounded-lg border bg-white shadow-sm ring-blue-600 peer-checked:ring-2 duration-200'>
                    <div className='pl-7'>
                      <h3 className='leading-none text-gray-800 font-medium'>{item.name}</h3>
                    </div>
                  </div>
                  <span className='block absolute top-5 left-5 border peer-checked:border-[5px] peer-checked:border-blue-600 w-4 h-4 rounded-full'></span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='my-8'>
        <p className='text-lg '>What best describes you? We'll point you in the right direction.</p>
        <div className=''>
          <ul className='mt-6 flex gap-4'>
            {describesOptions.map((item, idx) => (
              <li key={idx}>
                <label htmlFor={item.name} className='block relative'>
                  <input
                    id={item.name}
                    type='radio'
                    defaultChecked={idx == 0 ? true : false}
                    name='describes'
                    className='sr-only peer'
                  />
                  <div className='w-full p-5 cursor-pointer rounded-lg border bg-white shadow-sm ring-blue-600 peer-checked:ring-2 duration-200'>
                    <div className='pl-7'>
                      <h3 className='leading-none text-gray-800 font-medium'>{item.name}</h3>
                      <p className='mt-1 text-sm text-gray-600'>{item.description}</p>
                    </div>
                  </div>
                  <span className='block absolute top-5 left-5 border peer-checked:border-[5px] peer-checked:border-blue-600 w-4 h-4 rounded-full'></span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        type='submit'
        onClick={() => {
          setStep({
            ...steps,
            currentStep: steps.currentStep + 1,
          });
        }}
        className='flex gap-2 justify-center items-center px-4 py-2 text-white bg-blue-600 rounded-md duration-150 hover:bg-blue-700 active:shadow-lg'
      >
        Next
        <ArrowForwardIosOutlinedIcon fontSize='inherit' />
      </button>
    </div>,
    <div>
      <h1 className='text-3xl font-semibold'>Add your first project</h1>
      <div className='my-8'>
        <p className='text-lg '>
          Use this project to learn how our application works. You can add more details later.
        </p>
      </div>
      <div className='relative max-w-xs mb-8'>
        <label htmlFor={'projectName'} className='relative flex flex-col gap-2'>
          Project Name:
          <input
            name='projectName'
            type='text'
            placeholder='Enter your email'
            value={projectName.value}
            onChange={(value) => projectName.onChange(value)}
            className='w-full px-4 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg'
          />
        </label>
      </div>
      <button
        className='flex gap-2 justify-center items-center px-4 py-2 text-white bg-blue-600 rounded-md duration-150 hover:bg-blue-700 active:shadow-lg'
        onClick={async () => {
          setStep({
            ...steps,
            currentStep: steps.currentStep + 1,
          });
          if (projectName.value.trim() == '') return enqueueErrorBar('Invalid Project Name');
          console.log(projectName.value);
          try {
            const data = {
              name: projectName.value,
              projectOwnerId: teamMemberId,
              teamId: teamId,
            };
            console.log(data);
            //   Create new project
            const createProjectEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/projects`;
            const resultCreateProject = await axios.post(createProjectEndpoint, data);
            console.log('Result Create Project: ', resultCreateProject);
            enqueueSuccessBar('Create First Project Successfully');
            setStep({
              ...steps,
              currentStep: steps.currentStep + 1,
            });
          } catch (err: any) {
            console.log('ERROR: ', err.message);
            enqueueErrorBar(err.message || '');
          }
        }}
      >
        Next
        <ArrowForwardIosOutlinedIcon fontSize='inherit' />
      </button>
      <button
        className='flex gap-2 justify-center items-center px-4 py-2 text-white bg-blue-600 rounded-md duration-150 hover:bg-blue-700 active:shadow-lg mt-4'
        onClick={() => {
          setStep({
            ...steps,
            currentStep: steps.currentStep - 1,
          });
        }}
      >
        Back
      </button>
    </div>,
    <div>
      <h1 className='text-3xl font-semibold'>Add your team</h1>
      <div className='my-8'>
        <p className='text-lg '>
          Include anyone you'd like to schedule. You can invite them to log in later.
        </p>
      </div>
      <div className='relative max-w-xs mb-8'>
        <label htmlFor={'memberName'} className='relative flex flex-col gap-2'>
          Team Members:
          <input
            name='memberName'
            type='text'
            placeholder='Member name...'
            value={memberName.value}
            onChange={(value) => memberName.onChange(value)}
            className='w-full px-4 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-600 shadow-sm rounded-lg'
          />
        </label>
      </div>
      <button
        className='flex gap-2 justify-center items-center px-4 py-2 text-white bg-blue-600 rounded-md duration-150 hover:bg-blue-700 active:shadow-lg'
        onClick={async () => {
          console.log(memberName);
          if (memberName.value.trim() == '') return enqueueErrorBar('Invalid Project Name');
          try {
            const data = {
              name: memberName.value,
              teamId: teamId,
              type: 'Member',
            };
            console.log(data);
            //   Create new member
            const addPeopleEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/team-members`;
            const resultAddPeople = await axios.post(addPeopleEndpoint, data);
            console.log('Result Add Member: ', resultAddPeople);
            enqueueSuccessBar('Add Team Member Successfully');
            navigate(`/team/${teamId}/home`);
          } catch (err: any) {
            console.log('ERROR: ', err.message);
            enqueueErrorBar(err.message || '');
          }
        }}
      >
        Finish
        <ArrowForwardIosOutlinedIcon fontSize='inherit' />
      </button>
      <button
        className='flex gap-2 justify-center items-center px-4 py-2 text-white bg-blue-600 rounded-md duration-150 hover:bg-blue-700 active:shadow-lg mt-4'
        onClick={() => {
          setStep({
            ...steps,
            currentStep: steps.currentStep - 1,
          });
        }}
      >
        Back
      </button>
    </div>,
  ];

  return (
    <div className='flex h-screen flex-col md:flex-row'>
      <div className='flex-1 p-8'>
        <div className='max-w-xl px-4 mb-8 mx-8'>
          <ul aria-label='Steps' className='items-center text-gray-600 font-medium md:flex'>
            {steps.stepsItems.map((item, idx) => (
              <li
                aria-current={steps.currentStep == idx + 1 ? 'step' : false}
                className='flex-1 last:flex-none flex md:items-center'
                key={idx}
              >
                <div className='flex gap-x-3'>
                  <div className='flex items-center flex-col gap-x-2'>
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${steps.currentStep > idx + 1 ? 'bg-blue-600 border-blue-600' : '' || steps.currentStep == idx + 1 ? 'border-blue-600' : ''}`}
                    >
                      <span
                        className={` ${steps.currentStep > idx + 1 ? 'hidden' : '' || steps.currentStep == idx + 1 ? 'text-blue-600' : ''}`}
                      >
                        {idx + 1}
                      </span>
                      {steps.currentStep > idx + 1 ? (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-5 h-5 text-white'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M4.5 12.75l6 6 9-13.5'
                          />
                        </svg>
                      ) : (
                        ''
                      )}
                    </div>
                    <div
                      className={`h-12 flex items-center md:hidden ${idx + 1 == steps.stepsItems.length ? 'hidden' : ''}`}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-5 h-5 text-gray-500'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                        />
                      </svg>
                    </div>
                  </div>
                  <div className='h-8 flex items-center md:h-auto'>
                    <h3
                      className={`text-sm ${steps.currentStep == idx + 1 ? 'text-blue-600' : ''}`}
                    >
                      {item}
                    </h3>
                  </div>
                </div>
                <div
                  className={`flex-1 hidden md:block ${idx + 1 == steps.stepsItems.length ? 'md:hidden' : ''}`}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5 mx-auto text-gray-500'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.25 4.5l7.5 7.5-7.5 7.5'
                    />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='mx-8'>{stepContents[steps.currentStep - 1]}</div>
      </div>
      <div className='bg-blue-200 w-full md:w-1/3 p-8 flex justify-center items-center rounded-none md:rounded-s-2xl'>
        <img src={designImage} />
      </div>
    </div>
  );
}
