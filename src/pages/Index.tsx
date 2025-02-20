
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

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
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl font-bold tracking-tight mb-6">
            Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            A collection of selected works and case studies showcasing design and development expertise.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects?.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                {project.tags && (
                  <p className="mt-1 text-sm text-gray-600">
                    {project.tags}
                  </p>
                )}
                <p className="mt-2 text-gray-600 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
