"use client"

import React, { Component, useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga4';

export class AboutVivek extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about", // by default 'about' screen is active
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "education": <Education />,
            "skills": <Skills />,
            "projects": <Projects />,
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        // focus last visited screen
        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;

        // store this state
        localStorage.setItem("about-section", screen);

        // google analytics
        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "Custom Title" });


        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="about vivek" src="./themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">About Me</span>
                </div>
                <div id="education" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="vivek' education" src="./themes/Yaru/status/education.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Education</span>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="vivek' skills" src="./themes/Yaru/status/skills.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
                </div>
                <div id="projects" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="vivek' projects" src="./themes/Yaru/status/projects.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Projects</span>
                </div>
                <div id="resume" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="vivek's resume" src="./themes/Yaru/status/download.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Resume</span>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutVivek;

export const displayAboutVivek = () => {
    return <AboutVivek />;
}

function About() {
    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                <img className="w-full" src="./images/logos/TR-PIC.jpeg" alt="Vivek Patel Logo" />
            </div>
            <div className=" mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>my name is <span className="font-bold">THARANIKA</span> ,</div>
                <div className="font-normal ml-1">I'm a <span className="text-pink-600 font-bold">Engineering Student</span></div>
            </div>
            <div className=" mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className=" mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className=" list-pc">I'm a <span className=" font-medium">Graduate Student</span> currently pursuing CSD. </li>
                <li className=" mt-3 list-building"> I enjoy building Full Stack applications, AI Models and Data Pipelines that solves Real world problems.</li>
                {/* <li className=" mt-3 list-time"> When I am not coding my next project, I like to spend my time reading blogs-Technical one, playing football or watching YouTube videos.</li> */}
                <li className=" mt-3 list-star"> And I also have interest in Big Data and Cloud Computing!</li>
            </ul>
        </>
    )
}

function Education() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Education
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" w-10/12  mt-4 ml-4 px-0 md:px-1">
                <li className="list-disc">
                    <div className=" text-lg md:text-xl mt-4 text-left font-bold leading-tight">
                        Bannari Amman Institute of Technology - BIT
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2023 - 2027</div>
                    <div className=" text-sm md:text-base">Computer Science and Design</div>
                    <div className="text-sm text-gray-300 font-bold mt-1">CGPA &nbsp; 8.1/10 upto 5<sup>th</sup> semester</div>
                </li>
                <li className="list-disc mt-5">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Class 12<sup>th</sup>
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2021 - 2023</div>
                    <div className=" text-sm md:text-base">Maths, Physics, Chemistry, Biology</div>
                    <div className="text-sm text-gray-300 font-bold mt-1">Percentile Rank &nbsp; 90.5%</div>
                </li>
            </ul>
        </>
    )
}

// IconCloud component
function IconCloud({
  images,
  size = 600,
  iconSize = 60,
  radius = 200,
  maxSpeed = 0.015,
}) {
  const canvasRef = useRef(null)
  const [iconPositions, setIconPositions] = useState([])
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const animationFrameRef = useRef(undefined)
  const rotationRef = useRef(rotation)
  const iconCanvasesRef = useRef([])
  const imagesLoadedRef = useRef([])

  // Create icon canvases
  useEffect(() => {
    if (!images) return

    imagesLoadedRef.current = new Array(images.length).fill(false)

    const newIconCanvases = images.map((imageUrl, index) => {
      const offscreen = document.createElement("canvas")
      offscreen.width = iconSize
      offscreen.height = iconSize
      const offCtx = offscreen.getContext("2d")

      if (offCtx) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = imageUrl
        img.onload = () => {
          offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
          offCtx.drawImage(img, 0, 0, iconSize, iconSize)
          imagesLoadedRef.current[index] = true
        }
        img.onerror = () => {
          // Fallback for failed image loads
          console.warn(`Failed to load icon: ${imageUrl}`)
        }
      }
      return offscreen
    })

    iconCanvasesRef.current = newIconCanvases
  }, [images, iconSize])

  // Generate positions
  useEffect(() => {
    const newIcons = []
    const numIcons = images?.length || 20

    const offset = 2 / numIcons
    const increment = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * increment

      const x = Math.cos(phi) * r
      const z = Math.sin(phi) * r

      newIcons.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        scale: 1,
        opacity: 1,
        id: i,
      })
    }
    setIconPositions(newIcons)
  }, [images, radius])

  // Animation
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      rotationRef.current = {
        x: rotationRef.current.x,
        y: rotationRef.current.y + 0.005,
      }

      iconPositions.forEach((icon, index) => {
        const cosX = Math.cos(rotationRef.current.x)
        const sinX = Math.sin(rotationRef.current.x)
        const cosY = Math.cos(rotationRef.current.y)
        const sinY = Math.sin(rotationRef.current.y)

        const rotatedX = icon.x * cosY - icon.z * sinY
        const rotatedZ = icon.x * sinY + icon.z * cosY
        const rotatedY = icon.y * cosX + rotatedZ * sinX

        ctx.save()
        ctx.translate(canvas.width / 2 + rotatedX, canvas.height / 2 + rotatedY)
        ctx.scale(1, 1)
        const opacity = Math.max(0.2, Math.min(1, (rotatedZ + radius * 1.5) / (radius * 2)))
        ctx.globalAlpha = opacity

        if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
          ctx.drawImage(iconCanvasesRef.current[index], -iconSize / 2, -iconSize / 2, iconSize, iconSize)
        }

        ctx.restore()
      })
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [images, iconPositions, iconSize, radius])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="rounded-lg mx-auto"
      style={{ width: size, height: size }}
      aria-label="Interactive 3D Icon Cloud"
      role="img"
    />
  )
}

// Updated Skills function with comprehensive skill set
function Skills() {
    // Comprehensive skill slugs from the provided code
    const slugs = [
        "apachehadoop","c","css","docker","java","react",
        "eclipseide", "fastapi", "flask", "git", "github", "gitlab", "gitlfs","gradio",
        "graphql", "html5", "huggingface", "intellij", "javascript", "jupyter", "json",
        "langchain", "linux", "modelcontextprotocol", "mysql", "npm", "numpy",
        "n8n", "ollama", "openai","pandas", "pnpm", "postgresql", "pycharm", "python",
        "render", "selenium", "streamlit", 
         "ubuntu", "uv", "vercel", "vscode", "virtualbox", "v0", "windows11", "yaml",
    ];

    const deviconAvailable = new Set([
        "c", "css3", "docker", "eclipse", "fastapi", "flask",
        "git", "github", "gitlab", "go", "html5", "intellij", "javascript", "jupyter","mysql", "netlify", "npm", "numpy", "opencv", "pandas", "postgresql", "pycharm",
        "python", "pytorch", "redis","selenium", "tensorflow", "ubuntu", "vercel", "vscode",
        "windows11", "yaml",
    ]);

    function getIconUrl(slug) {
        if (deviconAvailable.has(slug)) {
            // Map specific slugs to correct devicon names
            const deviconMap = {
                "css": "css3",
                "gnubash": "bash",
                "eclipseide": "eclipse"
            };
            const iconName = deviconMap[slug] || slug;
            return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
        }
        return `https://cdn.simpleicons.org/${slug}`;
    }

    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Technical Skills
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" tracking-tight text-sm md:text-base w-10/12 emoji-list">
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    I've worked with a wide variety of programming languages & frameworks.
                </li>
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div> My areas of expertise are <strong className="text-ubt-gedit-orange">Full Stack Development,Gen AI,Big Data</strong></div>
                </li>
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div>Here are my most frequently used technologies:</div>
                </li>
            </ul>
            
            {/* Interactive 3D Skills Cloud */}
            <div className="w-full flex justify-center items-center my-8">
                <IconCloud 
                    images={slugs.map(getIconUrl)}
                    size={800}
                    iconSize={50}
                    radius={240}
                    maxSpeed={0.05}
                />
            </div>

            <ul className=" tracking-tight text-sm md:text-base w-10/12 -list mt-4">
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div>From <strong>Machine Learning frameworks</strong> like TensorFlow, PyTorch, and Keras to <strong>cloud platforms</strong> like Azure and development tools like Docker and Git.</div>
                </li>
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <span>And I'm always learning new technologies to stay current with industry trends!</span>
                </li>
            </ul>
        </>
    )
}

function Projects() {
    const project_list = [
        {
            name: "Iot Dashboard",
            date: "Oct 2025",
            link: "https://github.com/Tharanika-R-Git/REALTIME-IOT-DASHBOARD",
            description: [
                "Developed a full-stack IoT monitoring dashboard to track projects and sensor data in real time, building secure backend APIs using Node.js, Express.js, MySQL, and Prisma. Implemented real-time sensor updates with automated alert notifications for anomaly detection, and designed a responsive frontend with interactive charts to enable efficient data visualization and project management.",
            ],
            domains: ["React", "MySQL", "Node.js", "Docker","k8s"]
        },
        {
            name: "Website Rag using Scarpling",
            date: "Apr 2026",
            link: "https://github.com/Tharanika-R-Git/Website-rag-using-scrapling",
            description: [
                "A modular, production-ready Retrieval-Augmented Generation (RAG) backend that scrapes website content using Scrapling, chunks and embeds the text, and answers questions with an LLM (Groq API). Comes with a React frontend for seamless QA over any website.",
            ],
            domains: ["Python","Faiss","Scrapling","Groq API","React"]
        },

        {
            name: "ETL_Pipeline For Blinkit",
            date: "Feb 2026",
            link: "https://github.com/Tharanika-R-Git/ETL-PIPELINE-FOR-BLINKIT",
            description: [
                "Built an end-to-end ETL pipeline where data flows from OLTP systems into an OLAP warehouse. During debugging, I handled issues like slow extraction using indexing, transformation errors using schema validation, and duplicate records using UPSERT logic. I also implemented logging and validation checks to ensure data quality and pipeline reliability"
            ],
            domains: ["Python", "SQL", "ETL","pydantic","react"]
        },
    
        {
            name: "Student Career Guidance System",
            date: "Mar 2025",
            link: "https://github.com/Tharanika-R-Git/Agentic-Rag-Student-Career-Guidance",
            description: [
             
"Built an agentic RAG chatbot with FAISS + MiniLM enabling accurate retrieval and grounded responses via Azure OpenAI",
            ],
            domains: ["python", "faiss", "minilm", "azure-openai", "react"]
        }
    ];

    const tag_colors = {
        "javascript": "yellow-300",
        "firebase": "red-600",
        "firestore": "red-500",
        "firebase auth": "red-400",
        "chrome-extension": "yellow-400",
        "flutter": "blue-400",
        "dart": "blue-500",
        "react-native": "purple-500",
        "html5": "pink-600",
        "sass": "pink-400",
        "tensorflow": "yellow-600",
        "django": "green-600",
        "python": "green-200",
        "codeforces-api": "gray-300",
        "tailwindcss": "blue-300",
        "next.js": "purple-600"
    }

    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Projects
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            {
                project_list.map((project, index) => {
                    const projectNameFromLink = project.link.split('/')
                    const projectName = projectNameFromLink[projectNameFromLink.length - 1]
                    return (
                        <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex w-full flex-col px-4">
                            <div className="w-full py-1 px-2 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
                                <div className="flex flex-wrap justify-between items-center">
                                    <div className='flex justify-center items-center'>
                                        <div className=" text-base md:text-lg mr-2">{project.name}</div>
                                        {/* <iframe src={`https://ghbtns.com/github-btn.html?user=vivek9patel&repo=${projectName}&type=star&count=true`} frameBorder="0" scrolling="0" width="150" height="20" title={project.name.toLowerCase()+"-star"}></iframe> */}
                                    </div>
                                    <div className="text-gray-300 font-light text-sm">{project.date}</div>
                                </div>
                                <ul className=" tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                                    {
                                        project.description.map((desc, index) => {
                                            return <li key={index} className="list-disc mt-1 text-gray-100">{desc}</li>;
                                        })
                                    }
                                </ul>
                                <div className="flex flex-wrap items-start justify-start text-xs py-2">
                                    {
                                        (project.domains ?
                                            project.domains.map((domain, index) => {
                                                return <span key={index} className={`px-1.5 py-0.5 w-max border border-${tag_colors[domain]} text-${tag_colors[domain]} m-1 rounded-full`}>{domain}</span>
                                            })

                                            : null)
                                    }
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </>
    )
}

function Resume() {
    return (
        <iframe className="h-full w-full" src="./files/THARANIKA-RESUME.pdf" title="Tharanika resume" frameBorder="0"></iframe>
    )
}