import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const heroIllustration = "/boy.png";

const HeroSection = () => (
  <section
    className="relative overflow-hidden py-24 md:py-36 min-h-[90vh] flex items-center"
  >
<<<<<<< HEAD
    {/* Clean Gradient Aura */}
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[600px] bg-primary/10 blur-[180px] rounded-full opacity-30" />

    <div className="container relative z-10 grid lg:grid-cols-2 gap-16 items-center animate-fade-up">
        {/* Left Side: Information */}
        <div className="flex flex-col items-start gap-8 text-left">
            <div className="flex items-center gap-3 mb-2">
               <span className="text-primary font-bold text-lg">//</span>
               <span className="text-primary font-bold text-xs tracking-[0.4em] uppercase text-primary/80">Intelligence Deployed</span>
            </div>
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-white uppercase max-w-4xl">
              AI Study <span className="text-primary drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]">Learning.</span>
            </h1>
            <p className="max-w-xl text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              The next generation AI scheduling engine for elite academic performance. 
              Stop guessing, start executing your tactical roadmap.
            </p>
            <div className="mt-4">
              <Button size="lg" className="h-16 px-12 text-lg font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:shadow-[0_0_60px_rgba(255,0,0,0.6)] transition-all bg-primary hover:bg-primary/90 text-black rounded-none" asChild>
                <Link to="/login">Initialize Planner Scan</Link>
              </Button>
            </div>
        </div>

        {/* Right Side: Boy Illustration */}
        <div className="relative hidden lg:flex justify-center items-center">
            <div className="absolute inset-0 bg-primary/20 blur-[150px] rounded-full opacity-40" />
            <img
              src={heroIllustration}
              alt="AI Study Boy Illustration"
              className="w-full max-w-[600px] h-auto object-contain relative z-10 animate-fade-in opacity-80"
            />
=======
    <div className="container grid items-center gap-12 md:grid-cols-2">
      <div className="flex flex-col gap-6 animate-fade-up">
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          AI Study Planner
        </h1>
        <p className="text-lg font-medium text-primary md:text-xl">
          Plan smarter, study better with AI-powered scheduling.
        </p>
        <p className="max-w-lg text-muted-foreground">
          An intelligent study planning tool that helps students generate smart study timetables,
          prioritize difficult subjects, track learning progress, and stay prepared for exams.
        </p>
        <div>
          <Button size="lg" className="text-base font-semibold shadow-lg" asChild>
            <Link to="/login">Start Planning</Link>
          </Button>
>>>>>>> a03e0e6 (WIP)
        </div>
    </div>
  </section>
);






export default HeroSection;
