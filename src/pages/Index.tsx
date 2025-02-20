
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Portfolio
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            A collection of selected works and case studies showcasing design and development expertise.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative ${stickyNoteColors[index % stickyNoteColors.length]} rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-gray-100 mb-3">
                {project.image_url && (
                  <>
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold line-clamp-1">{project.title}</h3>
                {project.tags && (
                  <p className="text-xs text-gray-600">
                    {project.tags}
                  </p>
                )}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {project.description}
                </p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
