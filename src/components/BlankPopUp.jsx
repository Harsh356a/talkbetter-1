import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const BlankTemplatePopup = ({
  onClose,
  selectedTemplate,
  handleCreateAssistant,
}) => {
  const [name, setName] = useState("");

  return (
    <div
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      tabIndex="-1"
      style={{ pointerEvents: "auto" }}
    >
      <div className="w-1/2 bg-black shadow-lg duration-200 sm:rounded-lg p-10 text-white">
        <div className="flex flex-col gap-2 mb-2">
          <p>Voicebot Customization</p>
          <p>
            Let's customize your Voicebot! You can start by giving it a unique
            name
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Voicebot Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 w-full border outline-none rounded-md placeholder:text-black text-black"
              placeholder="Enter the Name"
            />
            <p className="text-sm">
              This is a basic AI assistant template with minimal configurations.
              It's designed to serve as a starting point for creating your
              custom voicebot.
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="text-white bg-[#25263F] px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#5D5FEF] text-white px-4 py-2 rounded-lg ml-2"
            onClick={() => handleCreateAssistant(name)}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

const TemplateSelection = ({ open }) => {
  const [configs, setConfigs] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await axios.get(
          "https://users.trainright.fit/api/configs/getConfigs",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setConfigs(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching configs:", error);
      }
    };

    fetchConfigs();
  }, []);

  const handleCreateAssistant = async (name) => {
    const token = localStorage.getItem("Token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.post(
        "https://users.trainright.fit/api/configs/createAssistant",
        {
          name: name,
          instructions: "Hello i am blank assistant",
          configId: "667bcdb873871446c339a734",
          twilioNumber: "+12176730597",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Assistant created successfully:", response.data);
      navigate(`/configurationdummyy/${response.data.data._id}`);
    } catch (error) {
      console.error("Error creating assistant:", error);
    }
  };

  const templates = [
    {
      title: "Appointment Setter",
      description:
        "For dental practices to demonstrate appointment setting. 13 utterances and examples showing emerging components.",
    },
    {
      title: "Customer Support",
      description:
        "For retail websites to demonstrate appointment setting. 15 utterances and examples showing emerging components.",
    },
    {
      title: "Inbound Q/A",
      description:
        "For dental practices to demonstrate appointment setting. 15 examples against schedules, showing emerging components.",
    },
    {
      title: "Game NPC",
      description:
        "For novel practices to demonstrate appointment setting. 13 utterances and examples showing emerging components.",
    },
    {
      title: "Create Template",
      description:
        "For dental practices to demonstrate appointment setting. 15 examples against schedules, showing emerging components.",
    },
  ];

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div
        className={`${
          open
            ? "lg:w-[65%] lg:left-[30%] left-[10rem] w-[60%] sm:left-[15rem] md:w-[70%] sm:w-[62%] xl:w-[82%] xl:left-[18%] xm:w-[68%]"
            : "lg:w-[90%] lg:left-[10%] w-[70%] left-[25%]"
        } absolute lg:top-[4.6rem] xl:top-[5rem] h-[85vh] rounded-3xl text-white w-64 top-[6.9rem] sm:top-[4.9rem]`}
      >
        <div className="max-w-4xl h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-400 rounded-xl pt-9 pl-9 pr-9 pb-9 bg-black mx-auto md:ml-60 md:mr-72">
          <h1 className="text-2xl text-center font-semibold mb-6">
            Let's create your first assistant!
          </h1>
          <p className="text-zinc-400 text-center mb-4">
            Here's a few templates to get you started:
          </p>

          <div className="md:p-4 text-white">
            <div className="space-y-4 w-fit">
              {templates.map((template, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#25263F] p-4 rounded-lg cursor-pointer"
                  onClick={() => handleTemplateClick(template)}
                >
                  <div className="rounded h-24 w-24 border border-blue-800"></div>
                  <div className="flex-1 ml-4">
                    <h2 className="text-lg font-bold">{template.title}</h2>
                    <p className="text-sm text-zinc-400">
                      {template.description}
                    </p>
                  </div>
                  <svg
                    className="w-6 h-6 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Link to="/">
              <button className="text-white bg-[#25263F] px-4 py-2 rounded-lg">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>

      {showPopup && (
        <>
          <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm z-40"></div>
          <BlankTemplatePopup
            onClose={handleClosePopup}
            selectedTemplate={selectedTemplate}
            handleCreateAssistant={handleCreateAssistant}
          />
        </>
      )}
    </>
  );
};

export default TemplateSelection;
