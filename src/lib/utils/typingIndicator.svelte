<span class="inline-flex items-center justify-center">
    <span class="w-1 h-1 mr-1 bg-current rounded-full animate-bounce delay-0"></span>
    <span class="w-1 h-1 mr-1 bg-current rounded-full animate-bounce delay-150"></span>
    <span class="w-1 h-1 bg-current rounded-full animate-bounce delay-300"></span>
</span>

<style>
    @keyframes bounce {
        0%, 60%, 100% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-4px);
        }
    }

    .animate-bounce {
        animation-name: bounce;
        animation-duration: 0.75s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    .delay-0 {
        animation-delay: 0s;
    }

    .delay-150 {
        animation-delay: 0.15s;
    }

    .delay-300 {
        animation-delay: 0.3s;
    }
</style>