import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const MPGValues = [
  { id: 1, name: "Class I", score: 0 },
  { id: 2, name: "Class II", score: 1 },
  { id: 3, name: "Class III", score: 2 },
  { id: 4, name: "Class IV", score: 2 },
];

const UpperLipBite = [
  { id: 1, name: "Class I", score: 0 },
  { id: 2, name: "Class II", score: 1 },
  { id: 3, name: "Class III", score: 2 },
];

const HeadNeckMovement = [
  { id: 3, name: "greater than 90 deg", score: 0 },
  { id: 2, name: "equal to 90 deg", score: 1 },
  { id: 1, name: "less than 90 deg", score: 2 },
];

const MpgInputBox = (props) => {
  const { mpgValue, setMpgValue, options } = props;

  return (
    <div className={`w-52 text-black`}>
      <Listbox value={mpgValue} onChange={setMpgValue}>
        <div className='relative'>
          <Listbox.Button className='relative w-full cursor-default rounded-lg bg-blue-300/20 px-3 py-1.5 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
            <span className='block truncate'>{mpgValue.name}</span>
          </Listbox.Button>
          <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <Listbox.Options className='absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {options.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {person.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

function InputBox(props) {
  const { value, setValue } = props;
  return (
    <div className='flex pr-2'>
      <input
        type='number'
        placeholder='Enter your value'
        className='arrow-remove w-44 rounded-md border py-1 pl-2'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

function App() {
  const [mpgValue, setMpgValue] = useState(MPGValues[0]);
  const [headNeckMovement, setHeadNeckMovement] = useState(HeadNeckMovement[0]);
  const [distance, setDistance] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [innerIncisorGap, setInnerIncisorGap] = useState();
  const [upperLipBite, setUpperLipBite] = useState(UpperLipBite[0]);

  const score = () => {
    let total = 0;
    total += parseInt(mpgValue.score) + parseInt(upperLipBite.score) + parseInt(headNeckMovement.score);

    if (!isNaN(parseFloat(distance))) {
      if (parseFloat(distance) > 6.5) {
        total += 0;
      } else if (parseFloat(distance) < 6) {
        total += 2;
      } else {
        total += 1;
      }
    }

    if (!isNaN(parseFloat(innerIncisorGap))) {
      if (parseFloat(innerIncisorGap) > 5) {
        total += 0;
      } else if (parseFloat(innerIncisorGap) < 4) {
        total += 2;
      } else {
        total += 1;
      }
    }

    const bmi = getBMI();
    if (!isNaN(parseFloat(bmi))) {
      if (parseFloat(bmi) < 25) {
        total += 0;
      } else if (parseFloat(bmi) <= 30) {
        total += 1;
      } else {
        total += 2;
      }
    }

    return total;
  };

  const getBMI = () => {
    return parseFloat(parseFloat(weight) / parseFloat(height * height)).toFixed(2);
  };

  const getBMIColor = () => {
    const bmi = getBMI();
    if (bmi < 16) return "text-rose-700";
    if (bmi < 17) return "text-rose-400";
    if (bmi < 18.5) return "text-yellow-500";
    if (bmi < 25) return "text-green-500";
    if (bmi < 30) return "text-yellow-500";
    if (bmi < 35) return "text-rose-400";
    if (bmi < 40) return "text-rose-700";
    return "text-rose-900";
  };

  return (
    <div className='flex h-full w-screen flex-col items-center justify-center space-y-2 bg-blue-50 px-2 text-black md:space-y-4 md:px-0'>
      <div className='text-center text-2xl font-bold text-blue-500 sm:text-3xl md:text-5xl'>
        SGT Airway Assessment App
      </div>
      <div className='pb-12 text-center text-base font-normal text-blue-400 md:w-1/2 md:text-2xl'>
        Developed by Department of Anesthesia SGT Medical College & Research Institute
      </div>
      <div className='flex w-full items-center justify-start space-x-6 md:w-1/3'>
        <div className='flex w-1/3 items-center justify-start'>MPG: </div>
        <MpgInputBox mpgValue={mpgValue} setMpgValue={setMpgValue} options={MPGValues} />
      </div>
      <div className='flex w-full items-center justify-start space-x-6 md:w-1/3'>
        <div className='flex w-1/3 items-center justify-start'>Tm Distance: </div>
        <InputBox value={distance} setValue={setDistance} /> cm
      </div>
      <div className='flex w-full items-center justify-start space-x-6 md:w-1/3'>
        <div className='flex w-1/3 items-center justify-start'>Head & Neck movement: </div>
        <MpgInputBox mpgValue={headNeckMovement} setMpgValue={setHeadNeckMovement} options={HeadNeckMovement} />
      </div>
      <div className='flex w-full items-center justify-start space-x-6 md:w-1/3'>
        <div className='flex w-1/3 items-center justify-start'>Weight: </div>
        <InputBox value={weight} setValue={setWeight} /> kg
      </div>
      <div className='flex w-full items-center justify-start space-x-6 md:w-1/3'>
        <div className='flex w-1/3 items-center justify-start'>Height: </div>
        <InputBox value={height} setValue={setHeight} /> m
      </div>
      {!isNaN(getBMI()) ? (
        <div className={`flex w-full items-center justify-start md:w-1/3`}>
          <div className='flex w-1/3 items-center justify-start'>BMI: </div>
          <div className={`flex pl-6 font-semibold ${getBMIColor()}`}>{getBMI()}</div>
        </div>
      ) : (
        <></>
      )}
      <div className='flex w-full items-center justify-start space-x-6 md:w-1/3'>
        <div className='flex w-1/3 items-center justify-start'>Inner incisor gap: </div>
        <InputBox value={innerIncisorGap} setValue={setInnerIncisorGap} /> cm
      </div>
      <div className='flex w-full items-center justify-start space-x-6 md:w-1/3'>
        <div className='flex w-1/3 items-center justify-start'>Upper lip Bite test: </div>
        <MpgInputBox mpgValue={upperLipBite} setMpgValue={setUpperLipBite} options={UpperLipBite} />
      </div>
      <div className={`flex w-full items-center justify-start pt-8 font-semibold md:w-1/3`}>
        <div className='flex w-2/6 items-center justify-start text-blue-500'>Intubation Difficulty: </div>
        <div className={`pl-6 ${score() < 3 ? "text-green-400" : score() < 8 ? "text-rose-400" : "text-rose-600"}`}>
          {score() < 3 ? "Easy" : score() < 8 ? "Moderate" : "Severe"}
        </div>
      </div>
      <div className={`flex w-full items-center justify-start text-2xl font-bold md:w-1/3 md:text-3xl`}>
        <div className='flex w-1/3 items-center justify-start text-blue-500'>Score: </div>
        <div className={`pl-6 ${score() < 3 ? "text-green-400" : score() < 8 ? "text-rose-400" : "text-rose-600"}`}>
          {score()}
        </div>
      </div>
    </div>
  );
}

export default App;
