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
  { id: 1, name: "less than 90 deg", score: 0 },
  { id: 2, name: "equal to 90 deg", score: 1 },
  { id: 3, name: "greater than 90 deg", score: 2 },
];

const MpgInputBox = (props) => {
  const { mpgValue, setMpgValue, options } = props;

  return (
    <div className='w-52 text-black'>
      <Listbox value={mpgValue} onChange={setMpgValue}>
        <div className='relative'>
          <Listbox.Button className='relative w-full cursor-default rounded-lg bg-blue-300/20 px-3 py-2 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
            <span className='block truncate'>{mpgValue.name}</span>
          </Listbox.Button>
          <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {options.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
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
    <div className='flex px-3'>
      <input
        type='number'
        className='arrow-remove w-20 rounded-md border pl-2'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

function App() {
  const [mpgValue, setMpgValue] = useState(MPGValues[0]);
  const [headNeckMovement, setHeadNeckMovement] = useState(HeadNeckMovement[0]);
  const [distance, setDistance] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [innerIncisorGap, setInnerIncisorGap] = useState(0);
  const [upperLipBite, setUpperLipBite] = useState(UpperLipBite[0]);

  const score = () => {
    let total = 0;
    total += parseInt(mpgValue.score) + parseInt(upperLipBite.score) + parseInt(headNeckMovement.score);

    if (parseFloat(distance) > 6.5) {
      total += 0;
    } else if (parseFloat(distance) < 6) {
      total += 2;
    } else {
      total += 1;
    }

    if (parseFloat(distance) > 6.5) {
      total += 0;
    } else if (parseFloat(distance) < 6) {
      total += 2;
    } else {
      total += 1;
    }

    return total;
  };

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center space-y-4 text-black'>
      <div className='flex w-full items-center justify-start space-x-6 md:w-1/3'>
        <div className='flex w-1/3 items-center justify-start'>MPG: </div>
        <MpgInputBox mpgValue={mpgValue} setMpgValue={setMpgValue} options={MPGValues} />
      </div>
      <div className='flex w-full items-center justify-start space-x-6 md:w-1/3'>
        <div className='flex w-1/3 items-center justify-start'>Tm Distance: </div>
        <InputBox value={distance} setValue={setDistance} />
        cm
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
      <div className='text-blue-500 flex w-full md:w-1/3 items-center justify-start'>BMI: {parseFloat(weight) / parseFloat(height * height)}</div>
      <div className='flex w-full items-center justify-start space-x-6 md:w-1/3'>
        <div className='flex w-1/3 items-center justify-start'>Inner incisor gap: </div>
        <InputBox value={innerIncisorGap} setValue={setInnerIncisorGap} /> cm
      </div>
      <div className='flex w-full items-center justify-start space-x-6 md:w-1/3'>
        <div className='flex w-1/3 items-center justify-start'>Upper lip Bite test: </div>
        <MpgInputBox mpgValue={upperLipBite} setMpgValue={setUpperLipBite} options={UpperLipBite} />
      </div>
      <div className={` text-2xl pt-8 ${(score() < 3 ? "text-green-400" : score() < 8 ? "text-orange-500" : "text-rose-400")}`}>Score: {score()}</div>
    </div>
  );
}

export default App;
