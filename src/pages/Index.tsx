import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ExternalLink, Code2, Palette, Terminal, Lightbulb } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const stickyNoteColors = [
  "bg-[#FEF7CD]", // Soft Yellow
  "bg-[#F2FCE2]", // Soft Green
  "bg-[#E5DEFF]", // Soft Purple
  "bg-[#FFDEE2]", // Soft Pink
  "bg-[#D3E4FD]", // Soft Blue
  "bg-[#FDE1D3]", // Soft Peach
];

const Index = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["portfolio-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_content")
        .select("*")
        .order("id", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {/* Development Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Code2 className="w-4 h-4" />
                    <span>Development</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem>Frontend</DropdownMenuItem>
                  <DropdownMenuItem>Backend</DropdownMenuItem>
                  <DropdownMenuItem>Full Stack</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Design Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Palette className="w-4 h-4" />
                    <span>Design</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem>UI Design</DropdownMenuItem>
                  <DropdownMenuItem>UX Design</DropdownMenuItem>
                  <DropdownMenuItem>Prototyping</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Tools</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem>VS Code</DropdownMenuItem>
                  <DropdownMenuItem>Git</DropdownMenuItem>
                  <DropdownMenuItem>Docker</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Resources Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>Resources</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem>Blog</DropdownMenuItem>
                  <DropdownMenuItem>Tutorials</DropdownMenuItem>
                  <DropdownMenuItem>Documentation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button>Contact Me</Button>
          </div>
        </div>
      </nav>

      {/* Grid Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(var(--grid-color)_1px,_transparent_1px),_linear-gradient(90deg,_var(--grid-color)_1px,_transparent_1px)] bg-[size:var(--grid-size)_var(--grid-size)]"
        style={{
          '--grid-color': 'rgba(0, 0, 0, 0.05)',
          '--grid-size': '40px'
        } as React.CSSProperties}
      />

      <div className="relative pt-16">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 space-y-4">
              <div className="text-4xl font-mono text-gray-800">Portfolio = {" "}
                <span className="text-blue-600">f</span>(
                <span className="text-green-600">creativity</span>, {" "}
                <span className="text-purple-600">code</span>)
              </div>
              <p className="text-lg text-gray-600 pl-8 border-l-2 border-gray-200">
                Where creativity meets technical implementation, resulting in unique digital experiences.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mt-8">
              <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg">
                <div className="font-mono text-xl mb-2">∑(experience)</div>
                <p>Years of development and design expertise</p>
              </div>
              <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg">
                <div className="font-mono text-xl mb-2">∞ creativity</div>
                <p>Unlimited creative possibilities</p>
              </div>
              <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg">
                <div className="font-mono text-xl mb-2">{"{ solutions }"}</div>
                <p>Elegant solutions to complex problems</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-2">Projects</h2>
            <p className="text-gray-600 mb-12">A collection of projects that showcase my skills and experience in development and design.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {projects?.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-1">{project.tags}</div>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-1">
                        <span className="font-mono text-gray-600">5+</span>
                        <span className="text-gray-500">Contributors</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-mono text-gray-600">10+</span>
                        <span className="text-gray-500">Stars</span>
                      </div>
                    </div>
                  </div>

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      View Project <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white/50 backdrop-blur-sm border-t py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Built with React & Supabase
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">GitHub</a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Twitter</a>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">LinkedIn</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
